(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[113],{

/***/ 8763:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { buildAst } = __webpack_require__(6725);
const { accept } = __webpack_require__(447);
const { DEFAULT_NS } = __webpack_require__(6728);

module.exports = {
  buildAst: buildAst,
  accept: accept,
  DEFAULT_NS: DEFAULT_NS,
};


/***/ }),

/***/ 6725:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { BaseXmlCstVisitor } = __webpack_require__(266);
const {
  last,
  forEach,
  reduce,
  map,
  pick,
  sortBy,
  isEmpty,
  isArray,
  assign,
} = __webpack_require__(6486);
const {
  findNextTextualToken,
  isXMLNamespaceKey,
  getXMLNamespaceKeyPrefix,
} = __webpack_require__(7151);

const { getAstChildrenReflective } = __webpack_require__(4724);
const { DEFAULT_NS } = __webpack_require__(6728);

/**
 * @param {DocumentCstNode} docCst
 * @param {IToken[]} tokenVector
 * @returns {XMLDocument}
 */
function buildAst(docCst, tokenVector) {
  AstBuilder.setState({ tokenVector });
  const xmlDocAst = AstBuilder.visit(docCst);

  if (xmlDocAst.rootElement !== invalidSyntax) {
    updateNamespaces(xmlDocAst.rootElement);
  }
  return xmlDocAst;
}

/* eslint-disable no-unused-vars -- consistent signatures in visitor methods even if they are empty placeholders */
class CstToAstVisitor extends BaseXmlCstVisitor {
  constructor() {
    super();
  }

  setState({ tokenVector }) {
    this.tokenVector = tokenVector;
  }

  visit(cstNode, params = {}) {
    return super.visit(cstNode, { location: cstNode.location, ...params });
  }

  /**
   * @param ctx {DocumentCtx}
   * @param opts {Object}
   * @param opts.location {SourcePosition}
   *
   * @returns {XMLDocument}
   */
  document(ctx, { location }) {
    const astNode = {
      type: "XMLDocument",
      rootElement: invalidSyntax,
      position: location,
    };

    if (ctx.prolog !== undefined) {
      astNode.prolog = this.visit(ctx.prolog[0]);
    }

    if (
      ctx.element !== undefined &&
      isEmpty(ctx.element[0].children) === false
    ) {
      astNode.rootElement = this.visit(ctx.element[0]);
    }

    setChildrenParent(astNode);

    return astNode;
  }

  /**
   * @param ctx {PrologCtx}
   * @param opts {Object}
   * @param opts.location {SourcePosition}
   */
  prolog(ctx, { location }) {
    const astNode = {
      type: "XMLProlog",
      attributes: [],
      position: location,
    };

    if (ctx.attribute !== undefined) {
      astNode.attributes = map(ctx.attribute, (_) =>
        this.visit(_, { isPrologParent: true })
      );
    }

    setChildrenParent(astNode);

    return astNode;
  }

  /**
   * @param {docTypeDeclCtx} ctx
   */
  /* istanbul ignore next - place holder*/
  docTypeDecl(ctx, astNode) {}

  /**
   * @param {ExternalIDCtx} ctx
   */
  /* istanbul ignore next - place holder*/
  externalID(ctx, astNode) {}

  /**
   * @param ctx {ContentCtx}
   * @param opts {Object}
   * @param opts.location {SourcePosition}
   *
   * @return {{elements, textContents}}
   */
  content(ctx, { location }) {
    let elements = [];
    let textContents = [];

    if (ctx.element !== undefined) {
      elements = map(ctx.element, this.visit.bind(this));
    }

    if (ctx.chardata !== undefined) {
      textContents = map(ctx.chardata, this.visit.bind(this));
    }

    return { elements, textContents };
  }

  /**
   * @param ctx {ElementCtx}
   * @param opts {Object}
   * @param opts.location {SourcePosition}
   */
  element(ctx, { location }) {
    const astNode = {
      type: "XMLElement",
      // Avoid Accidental Keys in this map
      namespaces: Object.create(null),
      name: invalidSyntax,
      attributes: [],
      subElements: [],
      textContents: [],
      position: location,
      syntax: {},
    };

    if (ctx.attribute !== undefined) {
      astNode.attributes = map(ctx.attribute, this.visit.bind(this));
    }

    if (ctx.content !== undefined) {
      const { elements, textContents } = this.visit(ctx.content[0]);
      astNode.subElements = elements;
      astNode.textContents = textContents;
    }

    handleElementOpenCloseNameRanges(astNode, ctx);
    handleElementOpenCloseBodyRanges(astNode, ctx);
    handleElementAttributeRanges(astNode, ctx, this.tokenVector);

    setChildrenParent(astNode);

    return astNode;
  }

  /**
   * @param ctx {ReferenceCtx}
   * @param opts {Object}
   * @param opts.location {SourcePosition}
   */
  /* istanbul ignore next - place holder*/
  reference(ctx, { location }) {
    // Irrelevant for the AST at this time
  }

  /**
   * @param ctx {AttributeCtx}
   * @param opts {Object}
   * @param opts.location {SourcePosition}
   * @param opts.isPrologParent {boolean}
   */
  attribute(ctx, { location, isPrologParent }) {
    const astNode = {
      type: isPrologParent ? "XMLPrologAttribute" : "XMLAttribute",
      position: location,
      key: invalidSyntax,
      value: invalidSyntax,
      syntax: {},
    };

    /* istanbul ignore else - Defensive Coding, not actually possible else branch */
    if (ctx.Name !== undefined && ctx.Name[0].isInsertedInRecovery !== true) {
      const keyToken = ctx.Name[0];
      astNode.key = keyToken.image;
      astNode.syntax.key = toXMLToken(keyToken);
    }

    if (
      ctx.STRING !== undefined &&
      ctx.STRING[0].isInsertedInRecovery !== true
    ) {
      const valueToken = ctx.STRING[0];
      astNode.value = stripQuotes(valueToken.image);
      astNode.syntax.value = toXMLToken(valueToken);
    }

    setChildrenParent(astNode);

    return astNode;
  }

  /**
   * @param ctx {ChardataCtx}
   * @param opts {Object}
   * @param opts.location {SourcePosition}
   */
  chardata(ctx, { location }) {
    const astNode = {
      type: "XMLTextContent",
      position: location,
      text: invalidSyntax,
    };

    let allTokens = [];
    if (ctx.SEA_WS !== undefined) {
      allTokens = allTokens.concat(ctx.SEA_WS);
    }
    if (ctx.TEXT !== undefined) {
      allTokens = allTokens.concat(ctx.TEXT);
    }
    const sortedTokens = sortBy(allTokens, ["startOffset"]);
    const fullText = map(sortedTokens, "image").join("");
    astNode.text = fullText;

    return astNode;
  }

  /**
   * @param ctx {MiscCtx}
   * @param opts {Object}
   * @param opts.location {SourcePosition}
   */
  /* istanbul ignore next - place holder*/
  misc(ctx, { location }) {
    // Irrelevant for the AST at this time
  }
}
/* eslint-enable no-unused-vars -- see matching disable comment */

const AstBuilder = new CstToAstVisitor();

function setChildrenParent(astParent) {
  const astChildren = getAstChildrenReflective(astParent);
  forEach(astChildren, (child) => (child.parent = astParent));
}

/**
 * @param {XMLElement} element
 * @param {Record<Prefix, Uri>} prevNamespaces
 */
function updateNamespaces(element, prevNamespaces = []) {
  const currElemNamespaces = reduce(
    element.attributes,
    (result, attrib) => {
      /* istanbul ignore else - Defensive Coding, not actually possible branch */
      if (attrib.key !== invalidSyntax) {
        if (
          isXMLNamespaceKey({ key: attrib.key, includeEmptyPrefix: false }) ===
          true
        ) {
          const prefix = getXMLNamespaceKeyPrefix(attrib.key);
          // TODO: Support un-defining namespaces (including the default one)
          if (attrib.value) {
            const uri = attrib.value;
            if (prefix !== "") {
              result[prefix] = uri;
            } else {
              // default namespace
              result[DEFAULT_NS] = uri;
            }
          }
        }
      }

      return result;
    },
    {}
  );

  const emptyMap = Object.create(null);
  // "newer" (closer scope)  namespaces definitions will overwrite "older" ones.
  element.namespaces = assign(emptyMap, prevNamespaces, currElemNamespaces);

  forEach(element.subElements, (subElem) =>
    updateNamespaces(subElem, element.namespaces)
  );
}

/**
 * @param {chevrotain.IToken} token
 */
function toXMLToken(token) {
  return pick(token, [
    "image",
    "startOffset",
    "endOffset",
    "startLine",
    "endLine",
    "startColumn",
    "endColumn",
  ]);
}

function startOfXMLToken(token) {
  return pick(token, ["startOffset", "startLine", "startColumn"]);
}

function endOfXMLToken(token) {
  return pick(token, ["endOffset", "endLine", "endColumn"]);
}

function exists(tokArr) {
  return (
    isArray(tokArr) &&
    tokArr.length === 1 &&
    tokArr[0].isInsertedInRecovery !== true
  );
}

function stripQuotes(quotedText) {
  return quotedText.substring(1, quotedText.length - 1);
}

/**
 * @param {string} text
 */
function nsToParts(text) {
  const matchResult = /^([^:]+):([^:]+)$/.exec(text);
  if (matchResult === null) {
    return null;
  }
  const ns = matchResult[1];
  const name = matchResult[2];
  return { ns, name };
}

/**
 * @type {InvalidSyntax}
 */
const invalidSyntax = null;

/**
 * @param {XMLElement} astNode
 * @param {ElementCtx} ctx
 */
function handleElementOpenCloseNameRanges(astNode, ctx) {
  if (ctx.Name !== undefined && ctx.Name[0].isInsertedInRecovery !== true) {
    const openNameToken = ctx.Name[0];
    astNode.syntax.openName = toXMLToken(openNameToken);
    const nsParts = nsToParts(openNameToken.image);
    if (nsParts !== null) {
      astNode.ns = nsParts.ns;
      astNode.name = nsParts.name;
    } else {
      astNode.name = openNameToken.image;
    }
  }

  if (
    ctx.END_NAME !== undefined &&
    ctx.END_NAME[0].isInsertedInRecovery !== true
  ) {
    astNode.syntax.closeName = toXMLToken(ctx.END_NAME[0]);
  }
}

/**
 * @param {XMLElement} astNode
 * @param {ElementCtx} ctx
 */
function handleElementOpenCloseBodyRanges(astNode, ctx) {
  /* istanbul ignore else - Defensive Coding */
  if (exists(ctx.OPEN)) {
    let openBodyCloseTok = undefined;
    /* istanbul ignore else - Defensive Coding */
    if (exists(ctx.START_CLOSE)) {
      openBodyCloseTok = ctx.START_CLOSE[0];
      astNode.syntax.isSelfClosing = false;
    } else if (exists(ctx.SLASH_CLOSE)) {
      openBodyCloseTok = ctx.SLASH_CLOSE[0];
      astNode.syntax.isSelfClosing = true;
    }

    if (openBodyCloseTok !== undefined) {
      astNode.syntax.openBody = {
        ...startOfXMLToken(ctx.OPEN[0]),
        ...endOfXMLToken(openBodyCloseTok),
      };
    }

    if (exists(ctx.SLASH_OPEN) && exists(ctx.END)) {
      astNode.syntax.closeBody = {
        ...startOfXMLToken(ctx.SLASH_OPEN[0]),
        ...endOfXMLToken(ctx.END[0]),
      };
    }
  }
}

/**
 * @param {XMLElement} astNode
 * @param {ElementCtx} ctx
 * @param {IToken[]} tokenVector
 */
function handleElementAttributeRanges(astNode, ctx, tokenVector) {
  if (exists(ctx.Name)) {
    const startOffset = ctx.Name[0].endOffset + 2;
    // Valid `attributesRange` exists
    if (exists(ctx.START_CLOSE) || exists(ctx.SLASH_CLOSE)) {
      const endOffset =
        (exists(ctx.START_CLOSE)
          ? ctx.START_CLOSE[0].startOffset
          : ctx.SLASH_CLOSE[0].startOffset) - 1;
      astNode.syntax.attributesRange = { startOffset, endOffset };
    }
    // Have to scan-ahead and guess where the attributes range ends
    else {
      const hasAttributes = isArray(ctx.attribute);
      const lastKnownAttribRangeTokenEnd = hasAttributes
        ? last(ctx.attribute).location.endOffset
        : ctx.Name[0].endOffset;
      const nextTextualToken = findNextTextualToken(
        tokenVector,
        lastKnownAttribRangeTokenEnd
      );
      if (nextTextualToken !== null) {
        astNode.syntax.guessedAttributesRange = {
          startOffset,
          endOffset: nextTextualToken.endOffset - 1,
        };
      }
    }
  }
}

module.exports = {
  buildAst: buildAst,
};


/***/ }),

/***/ 6728:
/***/ ((module) => {

module.exports = {
  DEFAULT_NS: "::DEFAULT",
};


/***/ }),

/***/ 4724:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { reduce, has, isArray } = __webpack_require__(6486);

function getAstChildrenReflective(astParent) {
  const astChildren = reduce(
    astParent,
    (result, prop, name) => {
      if (name === "parent") {
        // parent property is never a child...
      } else if (has(prop, "type")) {
        result.push(prop);
      } else if (isArray(prop) && prop.length > 0 && has(prop[0], "type")) {
        result = result.concat(prop);
      }

      return result;
    },
    []
  );

  return astChildren;
}

module.exports = {
  getAstChildrenReflective: getAstChildrenReflective,
};


/***/ }),

/***/ 447:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { forEach, isFunction } = __webpack_require__(6486);
const { getAstChildrenReflective } = __webpack_require__(4724);

/**
 * @param {XMLAstNode} node
 * @param {XMLAstVisitor} visitor
 *
 * @returns {void}
 */
function accept(node, visitor) {
  switch (node.type) {
    case "XMLDocument": {
      if (isFunction(visitor.visitXMLDocument)) {
        visitor.visitXMLDocument(node);
      }
      break;
    }
    case "XMLProlog": {
      if (isFunction(visitor.visitXMLProlog)) {
        visitor.visitXMLProlog(node);
      }
      break;
    }
    case "XMLPrologAttribute": {
      if (isFunction(visitor.visitXMLPrologAttribute)) {
        visitor.visitXMLPrologAttribute(node);
      }
      break;
    }
    case "XMLElement": {
      if (isFunction(visitor.visitXMLElement)) {
        visitor.visitXMLElement(node);
      }
      break;
    }
    case "XMLAttribute": {
      if (isFunction(visitor.visitXMLAttribute)) {
        visitor.visitXMLAttribute(node);
      }
      break;
    }
    case "XMLTextContent": {
      if (isFunction(visitor.visitXMLTextContent)) {
        visitor.visitXMLTextContent(node);
      }
      break;
    }
    /* istanbul ignore next  defensive programming */
    default:
      throw Error("None Exhaustive Match");
  }

  const astChildren = getAstChildrenReflective(node);
  forEach(astChildren, (childNode) => {
    accept(childNode, visitor);
  });
}

module.exports = {
  accept: accept,
};


/***/ }),

/***/ 7151:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { findNextTextualToken } = __webpack_require__(7681);
const {
  isXMLNamespaceKey,
  getXMLNamespaceKeyPrefix,
} = __webpack_require__(1943);

module.exports = {
  findNextTextualToken: findNextTextualToken,
  isXMLNamespaceKey: isXMLNamespaceKey,
  getXMLNamespaceKeyPrefix: getXMLNamespaceKeyPrefix,
};


/***/ }),

/***/ 7681:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { findIndex } = __webpack_require__(6486);

function findNextTextualToken(tokenVector, prevTokenEndOffset) {
  // The TokenVector is sorted, so we could use a BinarySearch to optimize performance
  const prevTokenIdx = findIndex(
    tokenVector,
    (tok) => tok.endOffset === prevTokenEndOffset
  );
  let nextTokenIdx = prevTokenIdx;
  let found = false;
  while (found === false) {
    nextTokenIdx++;
    const nextPossibleToken = tokenVector[nextTokenIdx];
    // No Next textualToken
    if (nextPossibleToken === undefined) {
      return null;
    }
    /* istanbul ignore next
     * I don't think this scenario can be created, however defensive coding never killed anyone...
     * Basically SEA_WS can only only appear in "OUTSIDE" mode, and we need a CLOSE/SLASH_CLOSE to get back to outside
     * mode, however if we had those  this function would never have been called...
     */
    if (nextPossibleToken.tokenType.name === "SEA_WS") {
      // skip pure WS tokens as they do not contain any actual text
    } else {
      return nextPossibleToken;
    }
  }
}

module.exports = {
  findNextTextualToken: findNextTextualToken,
};


/***/ }),

/***/ 1943:
/***/ ((module) => {

// The xml parser takes care of validating the attribute name.
// If the user started the attribute name with "xmlns:" we can assume that
// they meant for it to be an xml namespace attribute.
// xmlns attributes explicitly can't contain ":" after the "xmlns:" part.
const namespaceRegex = /^xmlns(?<prefixWithColon>:(?<prefix>[^:]*))?$/;

/**
 * See comment in api.d.ts.
 *
 * @param {string} key
 * @param {boolean} includeEmptyPrefix
 * @returns {boolean}
 */
function isXMLNamespaceKey({ key, includeEmptyPrefix }) {
  if (typeof key !== "string") {
    return false;
  }
  const matchArr = key.match(namespaceRegex);

  // No match - this is not an xmlns key
  if (matchArr === null) {
    return false;
  }

  return !!(
    includeEmptyPrefix === true ||
    // "xmlns" case
    !matchArr.groups.prefixWithColon ||
    // "xmlns:<prefix>" case
    matchArr.groups.prefix
  );
}

/**
 * See comment in api.d.ts.
 *
 * @param {string} key
 * @returns {string|undefined}
 */
function getXMLNamespaceKeyPrefix(key) {
  if (typeof key !== "string") {
    return undefined;
  }
  const matchArr = key.match(namespaceRegex);
  if (matchArr === null) {
    return undefined;
  }
  return (matchArr.groups && matchArr.groups.prefix) || "";
}

module.exports = {
  isXMLNamespaceKey: isXMLNamespaceKey,
  getXMLNamespaceKeyPrefix: getXMLNamespaceKeyPrefix,
};


/***/ }),

/***/ 9217:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { validate } = __webpack_require__(4434);
const {
  validateUniqueAttributeKeys,
} = __webpack_require__(63);
const {
  validateTagClosingNameMatch,
} = __webpack_require__(591);

/**
 * @param {XMLDocument} ast
 * @returns {ValidationIssue[]}
 */
function checkConstraints(ast) {
  const constraintIssues = validate({
    doc: ast,
    validators: {
      element: [validateTagClosingNameMatch, validateUniqueAttributeKeys],
    },
  });

  return constraintIssues;
}

module.exports = {
  checkConstraints,
};


/***/ }),

/***/ 591:
/***/ ((module) => {

/**
 * @param {XMLElement} elem
 * @returns {ValidationIssue[]}
 */
function validateTagClosingNameMatch(elem) {
  const openTagToken = elem.syntax.openName;
  const closeTagToken = elem.syntax.closeName;

  // The element tag must have **both** the opening and closing tokens
  // to be able to validate.
  if (!openTagToken || !closeTagToken) {
    return [];
  }

  // alles gut
  if (openTagToken.image === closeTagToken.image) {
    return [];
  } else {
    return [
      {
        msg: `tags mismatch: "${openTagToken.image}" must match closing tag: "${closeTagToken.image}"`,
        node: elem,
        severity: "error",
        position: {
          startOffset: openTagToken.startOffset,
          endOffset: openTagToken.endOffset,
        },
      },
      {
        msg: `tags mismatch: "${closeTagToken.image}" must match opening tag: "${openTagToken.image}"`,
        node: elem,
        severity: "error",
        position: {
          startOffset: closeTagToken.startOffset,
          endOffset: closeTagToken.endOffset,
        },
      },
    ];
  }
}

module.exports = {
  validateTagClosingNameMatch,
};


/***/ }),

/***/ 63:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { groupBy, pickBy, reduce, map, filter } = __webpack_require__(6486);

/**
 * @param {XMLElement} elem
 * @returns {ValidationIssue[]}
 */
function validateUniqueAttributeKeys(elem) {
  const attributesWithKeys = filter(elem.attributes, (_) => _.key !== null);
  const attribByKey = groupBy(attributesWithKeys, "key");
  const nonUniqueAttribsGroups = pickBy(attribByKey, (_) => _.length > 1);
  const nonUniqueAttribs = reduce(
    nonUniqueAttribsGroups,
    (result, attribsGroup) => result.concat(attribsGroup),
    []
  );

  const validationIssues = map(nonUniqueAttribs, (_) => {
    // the `key` is guaranteed to exist because we have filtered above
    // for attributes with valid keys
    const keyToken = _.syntax.key;
    return {
      msg: `duplicate attribute: "${_.key}"`,
      node: _,
      severity: "error",
      position: {
        startOffset: keyToken.startOffset,
        endOffset: keyToken.endOffset,
      },
    };
  });

  return validationIssues;
}

module.exports = {
  validateUniqueAttributeKeys,
};


/***/ }),

/***/ 266:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { xmlLexer } = __webpack_require__(1050);
const { xmlParser } = __webpack_require__(3515);

module.exports = {
  parse: function parse(text) {
    const lexResult = xmlLexer.tokenize(text);
    // setting a new input will RESET the parser instance's state.
    xmlParser.input = lexResult.tokens;
    // any top level rule may be used as an entry point
    const cst = xmlParser.document();

    return {
      cst: cst,
      tokenVector: lexResult.tokens,
      lexErrors: lexResult.errors,
      parseErrors: xmlParser.errors,
    };
  },

  BaseXmlCstVisitor: xmlParser.getBaseCstVisitorConstructor(),
};


/***/ }),

/***/ 1050:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { createToken: createTokenOrg, Lexer } = __webpack_require__(3650);

// A little mini DSL for easier lexer definition.
const fragments = {};
const f = fragments;

function FRAGMENT(name, def) {
  fragments[name] = typeof def === "string" ? def : def.source;
}

function makePattern(strings, ...args) {
  let combined = "";
  for (let i = 0; i < strings.length; i++) {
    combined += strings[i];
    if (i < args.length) {
      let pattern = args[i];
      // By wrapping in a RegExp (none) capturing group
      // We enabled the safe usage of qualifiers and assertions.
      combined += `(?:${pattern})`;
    }
  }
  return new RegExp(combined);
}

const tokensArray = [];
const tokensDictionary = {};

function createToken(options) {
  const newTokenType = createTokenOrg(options);
  tokensArray.push(newTokenType);
  tokensDictionary[options.name] = newTokenType;
  return newTokenType;
}

FRAGMENT(
  "NameStartChar",
  "(:|[a-zA-Z]|_|\\u2070-\\u218F|\\u2C00-\\u2FEF|\\u3001-\\uD7FF|\\uF900-\\uFDCF|\\uFDF0-\\uFFFD)"
);

FRAGMENT(
  "NameChar",
  makePattern`${f.NameStartChar}|-|\\.|\\d|\\u00B7||[\\u0300-\\u036F]|[\\u203F-\\u2040]`
);
FRAGMENT("Name", makePattern`${f.NameStartChar}(${f.NameChar})*`);

const Comment = createToken({
  name: "Comment",
  pattern: /<!--(.|\r?\n)*?-->/,
  // A Comment may span multiple lines.
  line_breaks: true,
});

const CData = createToken({
  name: "CData",
  pattern: /<!\[CDATA\[(.|\r?\n)*?]]>/,
  line_breaks: true,
});

const DocType = createToken({
  name: "DocType",
  pattern: /<!DOCTYPE/,
  push_mode: "INSIDE",
});

const IgnoredDTD = createToken({
  name: "DTD",
  pattern: /<!.*?>/,
  group: Lexer.SKIPPED,
});

const EntityRef = createToken({
  name: "EntityRef",
  pattern: makePattern`&${f.Name};`,
});

const CharRef = createToken({
  name: "CharRef",
  pattern: /&#\d+;|&#x[a-fA-F0-9]/,
});

const SEA_WS = createToken({
  name: "SEA_WS",
  pattern: /( |\t|\n|\r\n)+/,
});

const XMLDeclOpen = createToken({
  name: "XMLDeclOpen",
  pattern: /<\?xml[ \t\r\n]/,
  push_mode: "INSIDE",
});

const SLASH_OPEN = createToken({
  name: "SLASH_OPEN",
  pattern: /<\//,
  push_mode: "INSIDE",
});

const INVALID_SLASH_OPEN = createToken({
  name: "INVALID_SLASH_OPEN",
  pattern: /<\//,
  categories: [SLASH_OPEN],
});

const PROCESSING_INSTRUCTION = createToken({
  name: "PROCESSING_INSTRUCTION",
  pattern: makePattern`<\\?${f.Name}.*\\?>`,
});

const OPEN = createToken({ name: "OPEN", pattern: /</, push_mode: "INSIDE" });
// Meant to avoid skipping '<' token in a partial sequence of elements.
// Example of the problem this solves:
// <
// <from>john</from>
//  - The second '<' will be skipped because in the mode "INSIDE" '<' is not recognized.
//  - This means the AST will include only a single element instead of two
const INVALID_OPEN_INSIDE = createToken({
  name: "INVALID_OPEN_INSIDE",
  pattern: /</,
  categories: [OPEN],
});

const TEXT = createToken({ name: "TEXT", pattern: /[^<&]+/ });

const CLOSE = createToken({ name: "CLOSE", pattern: />/, pop_mode: true });

const SPECIAL_CLOSE = createToken({
  name: "SPECIAL_CLOSE",
  pattern: /\?>/,
  pop_mode: true,
});

const SLASH_CLOSE = createToken({
  name: "SLASH_CLOSE",
  pattern: /\/>/,
  pop_mode: true,
});

const SLASH = createToken({ name: "SLASH", pattern: /\// });

const STRING = createToken({
  name: "STRING",
  pattern: /"[^<"]*"|'[^<']*'/,
});

const EQUALS = createToken({ name: "EQUALS", pattern: /=/ });

const Name = createToken({ name: "Name", pattern: makePattern`${f.Name}` });

const S = createToken({
  name: "S",
  pattern: /[ \t\r\n]/,
  group: Lexer.SKIPPED,
});

const xmlLexerDefinition = {
  defaultMode: "OUTSIDE",

  modes: {
    OUTSIDE: [
      Comment,
      CData,
      DocType,
      IgnoredDTD,
      EntityRef,
      CharRef,
      SEA_WS,
      XMLDeclOpen,
      SLASH_OPEN,
      PROCESSING_INSTRUCTION,
      OPEN,
      TEXT,
    ],
    INSIDE: [
      // Tokens from `OUTSIDE` to improve error recovery behavior
      Comment,
      INVALID_SLASH_OPEN,
      INVALID_OPEN_INSIDE,
      // "Real" `INSIDE` tokens
      CLOSE,
      SPECIAL_CLOSE,
      SLASH_CLOSE,
      SLASH,
      EQUALS,
      STRING,
      Name,
      S,
    ],
  },
};

const xmlLexer = new Lexer(xmlLexerDefinition, {
  // Reducing the amount of position tracking can provide a small performance boost (<10%)
  // Likely best to keep the full info for better error position reporting and
  // to expose "fuller" ITokens from the Lexer.
  positionTracking: "full",
  ensureOptimizations: false,

  // TODO: inspect definitions for XML line terminators
  lineTerminatorCharacters: ["\n"],
  lineTerminatorsPattern: /\n|\r\n/g,
});

module.exports = {
  xmlLexer,
  tokensDictionary,
};


/***/ }),

/***/ 3515:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { CstParser, tokenMatcher } = __webpack_require__(3650);
const { tokensDictionary: t } = __webpack_require__(1050);

class Parser extends CstParser {
  constructor() {
    super(t, {
      maxLookahead: 1,
      recoveryEnabled: true,
      nodeLocationTracking: "full",
    });

    this.deletionRecoveryEnabled = true;

    const $ = this;

    $.RULE("document", () => {
      $.OPTION(() => {
        $.SUBRULE($.prolog);
      });

      $.MANY(() => {
        $.SUBRULE($.misc);
      });

      $.OPTION2(() => {
        $.SUBRULE($.docTypeDecl);
      });

      $.MANY2(() => {
        $.SUBRULE2($.misc);
      });

      $.SUBRULE($.element);

      $.MANY3(() => {
        $.SUBRULE3($.misc);
      });
    });

    $.RULE("prolog", () => {
      $.CONSUME(t.XMLDeclOpen);
      $.MANY(() => {
        $.SUBRULE($.attribute);
      });
      $.CONSUME(t.SPECIAL_CLOSE);
    });

    // https://www.w3.org/TR/xml/#NT-doctypedecl
    $.RULE("docTypeDecl", () => {
      $.CONSUME(t.DocType);
      $.CONSUME(t.Name);

      $.OPTION(() => {
        $.SUBRULE($.externalID);
      });

      // The internal subSet part is intentionally not implemented because we do not at this
      // time wish to implement a full DTD Parser as part of this project...
      // https://www.w3.org/TR/xml/#NT-intSubset

      $.CONSUME(t.CLOSE);
    });

    $.RULE("externalID", () => {
      // Using gates to assert the value of the "Name" Identifiers.
      // We could use Categories to model un-reserved keywords, however I am not sure
      // The added complexity is needed at this time...
      $.OR([
        {
          GATE: () => $.LA(1).image === "SYSTEM",
          ALT: () => {
            $.CONSUME2(t.Name, { LABEL: "System" });
            $.CONSUME(t.STRING, { LABEL: "SystemLiteral" });
          },
        },
        {
          GATE: () => $.LA(1).image === "PUBLIC",
          ALT: () => {
            $.CONSUME3(t.Name, { LABEL: "Public" });
            $.CONSUME2(t.STRING, { LABEL: "PubIDLiteral" });
            $.CONSUME3(t.STRING, { LABEL: "SystemLiteral" });
          },
        },
      ]);
    });

    $.RULE("content", () => {
      $.MANY(() => {
        $.OR([
          { ALT: () => $.SUBRULE($.element) },
          { ALT: () => $.SUBRULE($.chardata) },
          { ALT: () => $.SUBRULE($.reference) },
          { ALT: () => $.CONSUME(t.CData) },
          { ALT: () => $.CONSUME(t.PROCESSING_INSTRUCTION) },
          { ALT: () => $.CONSUME(t.Comment) },
        ]);
      });
    });

    $.RULE("element", () => {
      $.CONSUME(t.OPEN);
      try {
        this.deletionRecoveryEnabled = false;
        // disabling single token deletion here
        // because `<
        //            </note>`
        // will be parsed as: `<note>`
        // and the next element will be lost
        $.CONSUME(t.Name);
      } finally {
        this.deletionRecoveryEnabled = true;
      }
      $.MANY(() => {
        $.SUBRULE($.attribute);
      });

      $.OR([
        {
          ALT: () => {
            $.CONSUME(t.CLOSE, { LABEL: "START_CLOSE" });
            $.SUBRULE($.content);
            $.CONSUME(t.SLASH_OPEN);
            $.CONSUME2(t.Name, { LABEL: "END_NAME" });
            $.CONSUME2(t.CLOSE, { LABEL: "END" });
          },
        },
        {
          ALT: () => {
            $.CONSUME(t.SLASH_CLOSE);
          },
        },
      ]);
    });

    $.RULE("reference", () => {
      $.OR([
        { ALT: () => $.CONSUME(t.EntityRef) },
        { ALT: () => $.CONSUME(t.CharRef) },
      ]);
    });

    $.RULE("attribute", () => {
      $.CONSUME(t.Name);
      try {
        this.deletionRecoveryEnabled = false;
        // disabling single token deletion here
        // because `attrib1 attrib2="666`
        // will be parsed as: `attrib1="666`
        $.CONSUME(t.EQUALS);
        // disabling single token deletion here
        // to avoid new elementName being
        $.CONSUME(t.STRING);
      } finally {
        this.deletionRecoveryEnabled = true;
      }
    });

    $.RULE("chardata", () => {
      $.OR([
        { ALT: () => $.CONSUME(t.TEXT) },
        { ALT: () => $.CONSUME(t.SEA_WS) },
      ]);
    });

    $.RULE("misc", () => {
      $.OR([
        { ALT: () => $.CONSUME(t.Comment) },
        { ALT: () => $.CONSUME(t.PROCESSING_INSTRUCTION) },
        { ALT: () => $.CONSUME(t.SEA_WS) },
      ]);
    });

    this.performSelfAnalysis();
  }

  canRecoverWithSingleTokenDeletion(expectedTokType) {
    if (this.deletionRecoveryEnabled === false) {
      return false;
    }
    return super.canRecoverWithSingleTokenDeletion(expectedTokType);
  }

  // TODO: provide this fix upstream to chevrotain
  // https://github.com/SAP/chevrotain/issues/1055
  /* istanbul ignore next - should be tested as part of Chevrotain */
  findReSyncTokenType() {
    const allPossibleReSyncTokTypes = this.flattenFollowSet();
    // this loop will always terminate as EOF is always in the follow stack and also always (virtually) in the input
    let nextToken = this.LA(1);
    let k = 2;
    /* eslint-disable-next-line no-constant-condition -- see above comment */
    while (true) {
      const foundMatch = allPossibleReSyncTokTypes.find((resyncTokType) => {
        const canMatch = tokenMatcher(nextToken, resyncTokType);
        return canMatch;
      });
      if (foundMatch !== undefined) {
        return foundMatch;
      }
      nextToken = this.LA(k);
      k++;
    }
  }
}

// Re-use the same parser instance
const xmlParser = new Parser();

module.exports = {
  xmlParser,
};


/***/ }),

/***/ 5197:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { getSchemaValidators } = __webpack_require__(8673);
const { getSchemaSuggestionsProviders } = __webpack_require__(66);

module.exports = {
  getSchemaValidators: getSchemaValidators,
  getSchemaSuggestionsProviders: getSchemaSuggestionsProviders,
};


/***/ }),

/***/ 3025:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { difference, map } = __webpack_require__(6486);

/**
 * @param {XMLElement} elementNode
 * @param {XSSElement} xssElement
 *
 * @returns {CompletionSuggestion[]}
 */
function attributeNameCompletion(elementNode, xssElement) {
  const possibleSuggestions = map(xssElement.attributes, (_) => _.key);
  const existingAttribNames = map(elementNode.attributes, (_) => _.key);
  const possibleNewSuggestions = difference(
    possibleSuggestions,
    existingAttribNames
  );

  const suggestions = map(possibleNewSuggestions, (_) => {
    return {
      text: _,
      label: _,
      commitCharacter: "=",
    };
  });

  return suggestions;
}

module.exports = {
  attributeNameCompletion: attributeNameCompletion,
};


/***/ }),

/***/ 6252:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { has, isRegExp, forEach, isArray } = __webpack_require__(6486);

/**
 * @param {XMLAttribute} attributeNode
 * @param {XSSAttribute} xssAttribute
 * @param {string} prefix
 *
 * @returns {CompletionSuggestion[]}
 */
function attributeValueCompletion(attributeNode, xssAttribute, prefix = "") {
  // An XSS Attribute definition may not specify any constraints on a value
  if (has(xssAttribute, "value") === false) {
    return [];
  }

  const suggestions = [];
  const valueDef = xssAttribute.value;
  /* istanbul ignore else - defensive programming */
  if (isRegExp(valueDef)) {
    // No suggestions for regExp value definitions...
  } else if (isArray(valueDef)) {
    forEach(valueDef, (enumVal) => {
      if (enumVal.startsWith(prefix)) {
        suggestions.push({
          text: enumVal.substring(prefix.length),
          label: enumVal,
        });
      }
    });
  } else {
    /* istanbul ignore next  defensive programming */
    throw Error("None Exhaustive Match");
  }

  return suggestions;
}

module.exports = {
  attributeValueCompletion: attributeValueCompletion,
};


/***/ }),

/***/ 6834:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { difference, map, filter, has, pickBy } = __webpack_require__(6486);
const { DEFAULT_NS } = __webpack_require__(8763);

// https://www.w3.org/TR/2009/REC-xml-names-20091208/#NT-PrefixedName
const NAMESPACE_PATTERN = /^(?:([^:]*):)?([^:]*)$/;
/**
 *
 * Note that the Element (XML/XSS) are of the parent node of the element
 *   in which content assist was requested.
 *
 * @param {XMLElement} elementNode
 * @param {XSSElement} xssElement
 *
 * @returns {CompletionSuggestion[]}
 */
function elementNameCompletion(elementNode, xssElement, prefix = "") {
  const match = prefix.match(NAMESPACE_PATTERN);
  if (match === null) {
    return [];
  }
  // If there is no prefix, use the default namespace prefix
  const namespacePrefix = match[1] ? match[1] : DEFAULT_NS;
  const elementNamespaceUri = elementNode.namespaces[namespacePrefix];
  const possibleElements = filter(
    xssElement.elements,
    (_) =>
      has(_, "namespace") === false ||
      (_.namespace && _.namespace === elementNamespaceUri)
  );
  const possibleSuggestionsWithoutExistingSingular = applicableElements(
    xssElement.elements,
    elementNode.subElements,
    possibleElements
  );

  const suggestions = map(possibleSuggestionsWithoutExistingSingular, (_) => {
    return {
      text: _,
      label: _,
    };
  });

  if (namespacePrefix === undefined || namespacePrefix === DEFAULT_NS) {
    // Can't really suggest anything for the `implicit` default namespace...
    const namespacesWithoutDefault = pickBy(
      elementNode.namespaces,
      (uri, prefix) => prefix !== DEFAULT_NS
    );
    const applicableNamespaces = pickBy(namespacesWithoutDefault, (uri) => {
      const possibleElements = filter(
        xssElement.elements,
        (element) =>
          has(element, "namespace") === true && element.namespace === uri
      );
      const possibleSuggestionsWithoutExistingSingular = applicableElements(
        xssElement.elements,
        elementNode.subElements,
        possibleElements
      );
      const namespaceHasApplicableElements =
        possibleSuggestionsWithoutExistingSingular.length > 0;
      return namespaceHasApplicableElements;
    });
    const namespaceSuggestions = map(applicableNamespaces, (uri, prefix) => ({
      text: prefix,
      label: prefix,
      commitCharacter: ":",
      isNamespace: true,
    }));
    return [...namespaceSuggestions, ...suggestions];
  }
  return suggestions;
}

function applicableElements(xssElements, subElements, possibleElements) {
  const allPossibleSuggestions = map(
    possibleElements,
    (element) => element.name
  );
  const notSingularElem = filter(
    xssElements,
    (element) => element.cardinality === "many"
  );
  const notSingularElemNames = map(notSingularElem, (element) => element.name);
  const existingElemNames = map(subElements, (element) => element.name);
  const existingSingular = difference(existingElemNames, notSingularElemNames);
  const possibleSuggestionsWithoutExistingSingular = difference(
    allPossibleSuggestions,
    existingSingular
  );
  return possibleSuggestionsWithoutExistingSingular;
}

module.exports = {
  elementNameCompletion: elementNameCompletion,
};


/***/ }),

/***/ 66:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { attributeNameCompletion } = __webpack_require__(3025);
const {
  attributeValueCompletion,
} = __webpack_require__(6252);
const { elementNameCompletion } = __webpack_require__(6834);
const { findElementXssDef, findAttributeXssDef } = __webpack_require__(935);

function getSchemaSuggestionsProviders(schema) {
  const attributeNameProvider = buildAttributeNameProvider(schema);
  const attributeValueProvider = buildAttributeValueProvider(schema);
  const elementNameProvider = buildElementNameProvider(schema);

  return {
    schemaElementNameCompletion: elementNameProvider,
    schemaAttributeNameCompletion: attributeNameProvider,
    schemaAttributeValueCompletion: attributeValueProvider,
  };
}

/**
 * @param {SimpleSchema} schema
 */
function buildAttributeNameProvider(schema) {
  return ({ element, prefix }) => {
    const xssElementDef = findElementXssDef(element, schema);
    if (xssElementDef !== undefined) {
      return attributeNameCompletion(element, xssElementDef, prefix);
    } else {
      return [];
    }
  };
}

/**
 * @param {SimpleSchema} schema
 */
function buildElementNameProvider(schema) {
  return ({ element, prefix }) => {
    // Note we are finding the definition for the element's parent
    // Because the information on possible sibling elements exists there...
    const xssElementDef = findElementXssDef(element.parent, schema);
    if (xssElementDef !== undefined) {
      return elementNameCompletion(element.parent, xssElementDef, prefix);
    } else {
      return [];
    }
  };
}

/**
 * @param {SimpleSchema} schema
 */
function buildAttributeValueProvider(schema) {
  return ({ attribute, prefix }) => {
    const attributeXssDef = findAttributeXssDef(attribute, schema);
    return attributeValueCompletion(attribute, attributeXssDef, prefix);
  };
}

module.exports = {
  getSchemaSuggestionsProviders: getSchemaSuggestionsProviders,
};


/***/ }),

/***/ 8673:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { validateAttributeValue } = __webpack_require__(1323);

const {
  validateDuplicateSubElements,
} = __webpack_require__(5048);

const {
  validateRequiredAttributes,
} = __webpack_require__(9207);

const {
  validateRequiredSubElements,
} = __webpack_require__(6845);

const {
  validateUnknownAttributes,
} = __webpack_require__(6479);

const {
  validateUnknownSubElements,
} = __webpack_require__(3527);

const { findAttributeXssDef, findElementXssDef } = __webpack_require__(935);

function getSchemaValidators(schema) {
  const attributeValidator = buildAttributeValidator(schema);
  const elementValidator = buildElementValidator(schema);

  return {
    attribute: attributeValidator,
    element: elementValidator,
  };
}

/**
 * @param {SimpleSchema} schema
 */
function buildAttributeValidator(schema) {
  return (attributeNode) => {
    let issues = [];
    const xssAttributeDef = findAttributeXssDef(attributeNode, schema);

    if (xssAttributeDef !== undefined) {
      const attributeValueIssues = validateAttributeValue(
        attributeNode,
        xssAttributeDef
      );
      issues = issues.concat(attributeValueIssues);
    }

    return issues;
  };
}

/**
 * @param {SimpleSchema} schema
 */
function buildElementValidator(schema) {
  return (elementNode) => {
    let issues = [];
    const xssElementDef = findElementXssDef(elementNode, schema);

    if (xssElementDef !== undefined) {
      const duplicateElementsIssues = validateDuplicateSubElements(
        elementNode,
        xssElementDef
      );
      const requiredAttributesIssues = validateRequiredAttributes(
        elementNode,
        xssElementDef
      );
      const requiredSubElementsIssues = validateRequiredSubElements(
        elementNode,
        xssElementDef
      );
      const unknownAttributesIssues = validateUnknownAttributes(
        elementNode,
        xssElementDef
      );
      const unknownSubElementsIssues = validateUnknownSubElements(
        elementNode,
        xssElementDef
      );
      issues = issues.concat(
        duplicateElementsIssues,
        requiredAttributesIssues,
        requiredSubElementsIssues,
        unknownAttributesIssues,
        unknownSubElementsIssues
      );
    }

    return issues;
  };
}

module.exports = {
  getSchemaValidators: getSchemaValidators,
};


/***/ }),

/***/ 935:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { drop, map, forEach, first } = __webpack_require__(6486);

/**
 * @param {XMLAttribute} attribNode
 * @param {SimpleSchema} schema
 */
function findAttributeXssDef(attribNode, schema) {
  const xssElement = findElementXssDef(attribNode.parent, schema);

  let xssAttribute = undefined;
  if (xssElement !== undefined) {
    const attributeName = attribNode.key;
    xssAttribute = xssElement.attributes[attributeName];
  }

  return xssAttribute;
}

/**
 * @param {XMLElement} node
 * @param {SimpleSchema} schema
 */
function findElementXssDef(node, schema) {
  const ancestors = getAstNodeAncestors(node);
  const elementsPath = map(ancestors, "name");

  const rootElement = first(elementsPath);
  // Root Element mis-match, The Schema cannot provide any attribute validations for this XML AST.
  if (rootElement !== schema.name) {
    return undefined;
  }
  let xssElement = schema;
  forEach(drop(elementsPath), (elemName) => {
    // traverse subElements
    xssElement = xssElement.elements[elemName];
    if (xssElement === undefined) {
      return false;
    }
  });

  return xssElement;
}

/**
 * @param {XMLAstNode} node
 *
 * @returns {XMLAstNode[]} - The Ancestors do not include the XMLDocument
 */
function getAstNodeAncestors(node) {
  const ancestors = [];
  ancestors.push(node);
  let currAncestor = node.parent;
  while (
    currAncestor !== undefined &&
    // The Simple Schema only starts at the root Element (not the Root Document).
    currAncestor.type !== "XMLDocument"
  ) {
    ancestors.push(currAncestor);
    currAncestor = currAncestor.parent;
  }
  ancestors.reverse();

  return ancestors;
}

module.exports = {
  findAttributeXssDef: findAttributeXssDef,
  findElementXssDef: findElementXssDef,
};


/***/ }),

/***/ 1323:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { isRegExp, isArray, includes, has } = __webpack_require__(6486);
const { tokenToOffsetPosition } = __webpack_require__(3427);

/**
 * @param {XMLAttribute} attributeNode
 * @param {XSSAttribute }xssAttribute
 *
 * @returns {ValidationIssue[]}
 */
function validateAttributeValue(attributeNode, xssAttribute) {
  const issues = [];

  const valueDef = xssAttribute.value;

  // An XSS Attribute definition may not specify any constraints on a value
  if (has(xssAttribute, "value") === false) {
    return issues;
  }

  const actualValue = attributeNode.value;
  if (actualValue === null) {
    // we cannot validate a partial attribute AST without an actual value...
    return issues;
  }

  // This is always safe because at this point we know the attribute has a value
  const errPosition = tokenToOffsetPosition(attributeNode.syntax.value);
  /* istanbul ignore else  defensive programming */
  if (isRegExp(valueDef)) {
    if (valueDef.test(actualValue) === false) {
      issues.push({
        msg: `Expecting Value matching <${valueDef.toString()}> but found <${actualValue}>`,
        node: attributeNode,
        severity: "error",
        position: errPosition,
      });
    }
  } else if (isArray(valueDef)) {
    if (includes(valueDef, actualValue) === false) {
      issues.push({
        msg: `Expecting one of <${valueDef.toString()}> but found <${actualValue}>`,
        node: attributeNode,
        severity: "error",
        position: errPosition,
      });
    }
  } else {
    /* istanbul ignore next  defensive programming */
    throw Error("None Exhaustive Match");
  }

  return issues;
}

module.exports = {
  validateAttributeValue: validateAttributeValue,
};


/***/ }),

/***/ 5048:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { map, forEach, includes, filter, groupBy } = __webpack_require__(6486);
const { tokenToOffsetPosition } = __webpack_require__(3427);

/**
 * @param {XMLElement} elem
 * @param {XSSElement} schema
 *
 * @returns {ValidationIssue[]}
 */
function validateDuplicateSubElements(elem, schema) {
  const allowedDupElem = filter(
    schema.elements,
    (_) => _.cardinality === "many"
  );
  const allowedDupElemNames = map(allowedDupElem, (_) => _.name);

  const actualSubElemByName = groupBy(elem.subElements, (_) => _.name);
  const issues = [];
  forEach(actualSubElemByName, (dupElements, dupElementsName) => {
    const allowedDup = includes(allowedDupElemNames, dupElementsName);
    const hasConfiguration = schema.elements[dupElementsName] !== undefined;
    const hasDuplicates = dupElements.length > 1;

    if (allowedDup === false && hasDuplicates && hasConfiguration) {
      forEach(dupElements, (dupElem) => {
        issues.push({
          msg: `Duplicate Sub-Element: <${dupElem.name}> only a single occurrence of this Sub-Element is allowed here.`,
          node: dupElem,
          severity: "error",
          // safe assumption that we have an `openName` (see above condition)
          position: tokenToOffsetPosition(dupElem.syntax.openName),
        });
      });
    }
  });

  return issues;
}

module.exports = {
  validateDuplicateSubElements: validateDuplicateSubElements,
};


/***/ }),

/***/ 9207:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { map, filter, difference } = __webpack_require__(6486);
const { tokenToOffsetPosition } = __webpack_require__(3427);

/**
 * @param {XMLElement} elem
 * @param {XSSElement} schema
 *
 * @returns {ValidationIssue[]}
 */
function validateRequiredAttributes(elem, schema) {
  const requiredAttribsDef = filter(
    schema.attributes,
    (_) => _.required === true
  );
  const requiredAttribNames = map(requiredAttribsDef, (_) => _.key);

  const actualAttribNames = map(elem.attributes, (_) => _.key);
  const missingAttributesNames = difference(
    requiredAttribNames,
    actualAttribNames
  );

  // This elementName must always exist, otherwise we could not locate the relevant schema definition
  // so this validation could have never executed...
  const errPosition = tokenToOffsetPosition(elem.syntax.openName);
  const issues = map(missingAttributesNames, (_) => {
    return {
      msg: `Missing Required Attribute: <${_}>`,
      node: elem,
      severity: "error",
      position: errPosition,
    };
  });
  return issues;
}

module.exports = {
  validateRequiredAttributes: validateRequiredAttributes,
};


/***/ }),

/***/ 6845:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { map, filter, difference } = __webpack_require__(6486);
const { tokenToOffsetPosition } = __webpack_require__(3427);

/**
 * @param {XMLElement} elem
 * @param {XSSElement} schema
 *
 * @returns {ValidationIssue[]}
 */
function validateRequiredSubElements(elem, schema) {
  const requiredSubElemsDef = filter(
    schema.elements,
    (_) => _.required === true
  );
  const requiredElemNames = map(requiredSubElemsDef, (_) => _.name);

  const actualSubElemNameNames = map(elem.subElements, (_) => _.name);
  const missingSubElemNames = difference(
    requiredElemNames,
    actualSubElemNameNames
  );

  // This elementName must always exist, otherwise we could not locate the relevant schema definition
  // so this validation could have never executed...
  const errPosition = tokenToOffsetPosition(elem.syntax.openName);
  const issues = map(missingSubElemNames, (_) => {
    return {
      msg: `Missing Required Sub-Element: <${_}>`,
      node: elem,
      severity: "error",
      position: errPosition,
    };
  });
  return issues;
}

module.exports = {
  validateRequiredSubElements: validateRequiredSubElements,
};


/***/ }),

/***/ 6479:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { map, includes, forEach } = __webpack_require__(6486);
const { isXMLNamespaceKey } = __webpack_require__(7151);
const { tokenToOffsetPosition } = __webpack_require__(3427);

/**
 * @param {XMLElement} elem
 * @param {XSSElement} schema
 *
 * @returns {ValidationIssue[]}
 */
function validateUnknownAttributes(elem, schema) {
  // This validation is only relevant if the Schema disallows unknown attributes.
  if (schema.attributesType !== "closed") {
    return [];
  }
  const allowedAttribNames = map(schema.attributes, (_) => _.key);

  const issues = [];
  forEach(elem.attributes, (attrib) => {
    /* istanbul ignore else - Defensive programming, but cannot
     * reproduce this branch with current error recovery heuristics
     */
    if (attrib.key !== null) {
      if (
        includes(allowedAttribNames, attrib.key) === false &&
        isXMLNamespaceKey({ key: attrib.key, includeEmptyPrefix: true }) ===
          false
      ) {
        issues.push({
          msg: `Unknown Attribute: <${
            attrib.key
          }> only [${allowedAttribNames.toString()}] attributes are allowed`,
          node: attrib,
          severity: "error",
          // safe assumption that we have a `key` token (see above condition)
          position: tokenToOffsetPosition(attrib.syntax.key),
        });
      }
    }
  });
  return issues;
}

module.exports = {
  validateUnknownAttributes: validateUnknownAttributes,
};


/***/ }),

/***/ 3527:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { map, forEach, includes } = __webpack_require__(6486);
const { tokenToOffsetPosition } = __webpack_require__(3427);

/**
 * @param {XMLElement} elem
 * @param {XSSElement} schema
 *
 * @returns {ValidationIssue[]}
 */
function validateUnknownSubElements(elem, schema) {
  // This validation is only relevant if the Schema disallows unknown elements.
  if (schema.elementsType !== "closed") {
    return [];
  }

  const allowedElemNames = map(schema.elements, (_) => _.name);

  const issues = [];
  forEach(elem.subElements, (subElem) => {
    if (subElem.name !== null) {
      if (includes(allowedElemNames, subElem.name) === false) {
        issues.push({
          msg: `Unknown Sub-Element: <${
            subElem.name
          }> only [${allowedElemNames.toString()}] Sub-Elements are allowed`,
          node: subElem,
          severity: "error",
          // safe assumption that we have an `openName` (see above condition)
          position: tokenToOffsetPosition(subElem.syntax.openName),
        });
      }
    }
  });

  return issues;
}

module.exports = {
  validateUnknownSubElements: validateUnknownSubElements,
};


/***/ }),

/***/ 3427:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { pick } = __webpack_require__(6486);

function tokenToOffsetPosition(token) {
  return pick(token, ["startOffset", "endOffset"]);
}

module.exports = {
  tokenToOffsetPosition: tokenToOffsetPosition,
};


/***/ }),

/***/ 4434:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { validate } = __webpack_require__(8546);

module.exports = {
  validate: validate,
};


/***/ }),

/***/ 8546:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { accept } = __webpack_require__(8763);
const { defaultsDeep, flatMap } = __webpack_require__(6486);

function validate(options) {
  const actualOptions = defaultsDeep(options, {
    validators: {
      attribute: [],
      element: [],
    },
  });

  let issues = [];

  const validateVisitor = {
    visitXMLElement: function (node) {
      const newIssues = flatMap(actualOptions.validators.element, (validator) =>
        validator(node)
      );
      issues = issues.concat(newIssues);
    },
    visitXMLAttribute: function (node) {
      const newIssues = flatMap(
        actualOptions.validators.attribute,
        (validator) => validator(node)
      );
      issues = issues.concat(newIssues);
    },
  };

  accept(actualOptions.doc, validateVisitor);

  return issues;
}

module.exports = {
  validate: validate,
};


/***/ }),

/***/ 3650:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Alternation": () => (/* reexport */ Alternation),
  "Alternative": () => (/* reexport */ Alternative),
  "CstParser": () => (/* reexport */ CstParser),
  "EMPTY_ALT": () => (/* reexport */ EMPTY_ALT),
  "EOF": () => (/* reexport */ EOF),
  "EarlyExitException": () => (/* reexport */ EarlyExitException),
  "EmbeddedActionsParser": () => (/* reexport */ EmbeddedActionsParser),
  "GAstVisitor": () => (/* reexport */ GAstVisitor),
  "Lexer": () => (/* reexport */ Lexer),
  "LexerDefinitionErrorType": () => (/* reexport */ LexerDefinitionErrorType),
  "MismatchedTokenException": () => (/* reexport */ MismatchedTokenException),
  "NoViableAltException": () => (/* reexport */ NoViableAltException),
  "NonTerminal": () => (/* reexport */ NonTerminal),
  "NotAllInputParsedException": () => (/* reexport */ NotAllInputParsedException),
  "Option": () => (/* reexport */ Option),
  "Parser": () => (/* binding */ api_Parser),
  "ParserDefinitionErrorType": () => (/* reexport */ ParserDefinitionErrorType),
  "Repetition": () => (/* reexport */ Repetition),
  "RepetitionMandatory": () => (/* reexport */ RepetitionMandatory),
  "RepetitionMandatoryWithSeparator": () => (/* reexport */ RepetitionMandatoryWithSeparator),
  "RepetitionWithSeparator": () => (/* reexport */ RepetitionWithSeparator),
  "Rule": () => (/* reexport */ Rule),
  "Terminal": () => (/* reexport */ Terminal),
  "VERSION": () => (/* reexport */ VERSION),
  "assignOccurrenceIndices": () => (/* reexport */ assignOccurrenceIndices),
  "clearCache": () => (/* binding */ clearCache),
  "createSyntaxDiagramsCode": () => (/* reexport */ createSyntaxDiagramsCode),
  "createToken": () => (/* reexport */ createToken),
  "createTokenInstance": () => (/* reexport */ createTokenInstance),
  "defaultGrammarResolverErrorProvider": () => (/* reexport */ defaultGrammarResolverErrorProvider),
  "defaultGrammarValidatorErrorProvider": () => (/* reexport */ defaultGrammarValidatorErrorProvider),
  "defaultLexerErrorProvider": () => (/* reexport */ defaultLexerErrorProvider),
  "defaultParserErrorProvider": () => (/* reexport */ defaultParserErrorProvider),
  "generateParserFactory": () => (/* reexport */ generateParserFactory),
  "generateParserModule": () => (/* reexport */ generateParserModule),
  "isRecognitionException": () => (/* reexport */ isRecognitionException),
  "resolveGrammar": () => (/* reexport */ gast_resolver_public_resolveGrammar),
  "serializeGrammar": () => (/* reexport */ serializeGrammar),
  "serializeProduction": () => (/* reexport */ serializeProduction),
  "tokenLabel": () => (/* reexport */ tokenLabel),
  "tokenMatcher": () => (/* reexport */ tokenMatcher),
  "tokenName": () => (/* reexport */ tokenName),
  "validateGrammar": () => (/* reexport */ gast_resolver_public_validateGrammar)
});

;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/version.js
// needs a separate module as this is required inside chevrotain productive code
// and also in the entry point for webpack(api.ts).
// A separate file avoids cyclic dependencies and webpack errors.
var VERSION = "7.1.1";
//# sourceMappingURL=version.js.map
// EXTERNAL MODULE: ./node_modules/chevrotain/lib_esm/src/utils/utils.js
var utils = __webpack_require__(5465);
// EXTERNAL MODULE: ./node_modules/regexp-to-ast/lib/regexp-to-ast.js
var regexp_to_ast = __webpack_require__(4556);
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/scan/reg_exp_parser.js

var regExpAstCache = {};
var regExpParser = new regexp_to_ast.RegExpParser();
function getRegExpAst(regExp) {
    var regExpStr = regExp.toString();
    if (regExpAstCache.hasOwnProperty(regExpStr)) {
        return regExpAstCache[regExpStr];
    }
    else {
        var regExpAst = regExpParser.pattern(regExpStr);
        regExpAstCache[regExpStr] = regExpAst;
        return regExpAst;
    }
}
function clearRegExpParserCache() {
    regExpAstCache = {};
}
//# sourceMappingURL=reg_exp_parser.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/scan/reg_exp.js
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var complementErrorMessage = "Complement Sets are not supported for first char optimization";
var failedOptimizationPrefixMsg = 'Unable to use "first char" lexer optimizations:\n';
function getOptimizedStartCodesIndices(regExp, ensureOptimizations) {
    if (ensureOptimizations === void 0) { ensureOptimizations = false; }
    try {
        var ast = getRegExpAst(regExp);
        var firstChars = firstCharOptimizedIndices(ast.value, {}, ast.flags.ignoreCase);
        return firstChars;
    }
    catch (e) {
        /* istanbul ignore next */
        // Testing this relies on the regexp-to-ast library having a bug... */
        // TODO: only the else branch needs to be ignored, try to fix with newer prettier / tsc
        if (e.message === complementErrorMessage) {
            if (ensureOptimizations) {
                (0,utils/* PRINT_WARNING */.rr)("" + failedOptimizationPrefixMsg +
                    ("\tUnable to optimize: < " + regExp.toString() + " >\n") +
                    "\tComplement Sets cannot be automatically optimized.\n" +
                    "\tThis will disable the lexer's first char optimizations.\n" +
                    "\tSee: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.");
            }
        }
        else {
            var msgSuffix = "";
            if (ensureOptimizations) {
                msgSuffix =
                    "\n\tThis will disable the lexer's first char optimizations.\n" +
                        "\tSee: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.";
            }
            (0,utils/* PRINT_ERROR */.WB)(failedOptimizationPrefixMsg + "\n" +
                ("\tFailed parsing: < " + regExp.toString() + " >\n") +
                ("\tUsing the regexp-to-ast library version: " + regexp_to_ast.VERSION + "\n") +
                "\tPlease open an issue at: https://github.com/bd82/regexp-to-ast/issues" +
                msgSuffix);
        }
    }
    return [];
}
function firstCharOptimizedIndices(ast, result, ignoreCase) {
    switch (ast.type) {
        case "Disjunction":
            for (var i = 0; i < ast.value.length; i++) {
                firstCharOptimizedIndices(ast.value[i], result, ignoreCase);
            }
            break;
        case "Alternative":
            var terms = ast.value;
            for (var i = 0; i < terms.length; i++) {
                var term = terms[i];
                // skip terms that cannot effect the first char results
                switch (term.type) {
                    case "EndAnchor":
                    // A group back reference cannot affect potential starting char.
                    // because if a back reference is the first production than automatically
                    // the group being referenced has had to come BEFORE so its codes have already been added
                    case "GroupBackReference":
                    // assertions do not affect potential starting codes
                    case "Lookahead":
                    case "NegativeLookahead":
                    case "StartAnchor":
                    case "WordBoundary":
                    case "NonWordBoundary":
                        continue;
                }
                var atom = term;
                switch (atom.type) {
                    case "Character":
                        addOptimizedIdxToResult(atom.value, result, ignoreCase);
                        break;
                    case "Set":
                        if (atom.complement === true) {
                            throw Error(complementErrorMessage);
                        }
                        (0,utils/* forEach */.Ed)(atom.value, function (code) {
                            if (typeof code === "number") {
                                addOptimizedIdxToResult(code, result, ignoreCase);
                            }
                            else {
                                // range
                                var range = code;
                                // cannot optimize when ignoreCase is
                                if (ignoreCase === true) {
                                    for (var rangeCode = range.from; rangeCode <= range.to; rangeCode++) {
                                        addOptimizedIdxToResult(rangeCode, result, ignoreCase);
                                    }
                                }
                                // Optimization (2 orders of magnitude less work for very large ranges)
                                else {
                                    // handle unoptimized values
                                    for (var rangeCode = range.from; rangeCode <= range.to && rangeCode < minOptimizationVal; rangeCode++) {
                                        addOptimizedIdxToResult(rangeCode, result, ignoreCase);
                                    }
                                    // Less common charCode where we optimize for faster init time, by using larger "buckets"
                                    if (range.to >= minOptimizationVal) {
                                        var minUnOptVal = range.from >= minOptimizationVal
                                            ? range.from
                                            : minOptimizationVal;
                                        var maxUnOptVal = range.to;
                                        var minOptIdx = charCodeToOptimizedIndex(minUnOptVal);
                                        var maxOptIdx = charCodeToOptimizedIndex(maxUnOptVal);
                                        for (var currOptIdx = minOptIdx; currOptIdx <= maxOptIdx; currOptIdx++) {
                                            result[currOptIdx] = currOptIdx;
                                        }
                                    }
                                }
                            }
                        });
                        break;
                    case "Group":
                        firstCharOptimizedIndices(atom.value, result, ignoreCase);
                        break;
                    /* istanbul ignore next */
                    default:
                        throw Error("Non Exhaustive Match");
                }
                // reached a mandatory production, no more **start** codes can be found on this alternative
                var isOptionalQuantifier = atom.quantifier !== undefined && atom.quantifier.atLeast === 0;
                if (
                // A group may be optional due to empty contents /(?:)/
                // or if everything inside it is optional /((a)?)/
                (atom.type === "Group" && isWholeOptional(atom) === false) ||
                    // If this term is not a group it may only be optional if it has an optional quantifier
                    (atom.type !== "Group" && isOptionalQuantifier === false)) {
                    break;
                }
            }
            break;
        /* istanbul ignore next */
        default:
            throw Error("non exhaustive match!");
    }
    // console.log(Object.keys(result).length)
    return (0,utils/* values */.VO)(result);
}
function addOptimizedIdxToResult(code, result, ignoreCase) {
    var optimizedCharIdx = charCodeToOptimizedIndex(code);
    result[optimizedCharIdx] = optimizedCharIdx;
    if (ignoreCase === true) {
        handleIgnoreCase(code, result);
    }
}
function handleIgnoreCase(code, result) {
    var char = String.fromCharCode(code);
    var upperChar = char.toUpperCase();
    /* istanbul ignore else */
    if (upperChar !== char) {
        var optimizedCharIdx = charCodeToOptimizedIndex(upperChar.charCodeAt(0));
        result[optimizedCharIdx] = optimizedCharIdx;
    }
    else {
        var lowerChar = char.toLowerCase();
        if (lowerChar !== char) {
            var optimizedCharIdx = charCodeToOptimizedIndex(lowerChar.charCodeAt(0));
            result[optimizedCharIdx] = optimizedCharIdx;
        }
    }
}
function findCode(setNode, targetCharCodes) {
    return (0,utils/* find */.sE)(setNode.value, function (codeOrRange) {
        if (typeof codeOrRange === "number") {
            return (0,utils/* contains */.r3)(targetCharCodes, codeOrRange);
        }
        else {
            // range
            var range_1 = codeOrRange;
            return ((0,utils/* find */.sE)(targetCharCodes, function (targetCode) { return range_1.from <= targetCode && targetCode <= range_1.to; }) !== undefined);
        }
    });
}
function isWholeOptional(ast) {
    if (ast.quantifier && ast.quantifier.atLeast === 0) {
        return true;
    }
    if (!ast.value) {
        return false;
    }
    return (0,utils/* isArray */.kJ)(ast.value)
        ? (0,utils/* every */.yW)(ast.value, isWholeOptional)
        : isWholeOptional(ast.value);
}
var CharCodeFinder = /** @class */ (function (_super) {
    __extends(CharCodeFinder, _super);
    function CharCodeFinder(targetCharCodes) {
        var _this = _super.call(this) || this;
        _this.targetCharCodes = targetCharCodes;
        _this.found = false;
        return _this;
    }
    CharCodeFinder.prototype.visitChildren = function (node) {
        // No need to keep looking...
        if (this.found === true) {
            return;
        }
        // switch lookaheads as they do not actually consume any characters thus
        // finding a charCode at lookahead context does not mean that regexp can actually contain it in a match.
        switch (node.type) {
            case "Lookahead":
                this.visitLookahead(node);
                return;
            case "NegativeLookahead":
                this.visitNegativeLookahead(node);
                return;
        }
        _super.prototype.visitChildren.call(this, node);
    };
    CharCodeFinder.prototype.visitCharacter = function (node) {
        if ((0,utils/* contains */.r3)(this.targetCharCodes, node.value)) {
            this.found = true;
        }
    };
    CharCodeFinder.prototype.visitSet = function (node) {
        if (node.complement) {
            if (findCode(node, this.targetCharCodes) === undefined) {
                this.found = true;
            }
        }
        else {
            if (findCode(node, this.targetCharCodes) !== undefined) {
                this.found = true;
            }
        }
    };
    return CharCodeFinder;
}(regexp_to_ast.BaseRegExpVisitor));
function canMatchCharCode(charCodes, pattern) {
    if (pattern instanceof RegExp) {
        var ast = getRegExpAst(pattern);
        var charCodeFinder = new CharCodeFinder(charCodes);
        charCodeFinder.visit(ast);
        return charCodeFinder.found;
    }
    else {
        return ((0,utils/* find */.sE)(pattern, function (char) {
            return (0,utils/* contains */.r3)(charCodes, char.charCodeAt(0));
        }) !== undefined);
    }
}
//# sourceMappingURL=reg_exp.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/scan/lexer.js
var lexer_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var PATTERN = "PATTERN";
var DEFAULT_MODE = "defaultMode";
var MODES = "modes";
var SUPPORT_STICKY = typeof new RegExp("(?:)").sticky === "boolean";
function disableSticky() {
    SUPPORT_STICKY = false;
}
function enableSticky() {
    SUPPORT_STICKY = true;
}
function analyzeTokenTypes(tokenTypes, options) {
    options = (0,utils/* defaults */.ce)(options, {
        useSticky: SUPPORT_STICKY,
        debug: false,
        safeMode: false,
        positionTracking: "full",
        lineTerminatorCharacters: ["\r", "\n"],
        tracer: function (msg, action) { return action(); }
    });
    var tracer = options.tracer;
    tracer("initCharCodeToOptimizedIndexMap", function () {
        initCharCodeToOptimizedIndexMap();
    });
    var onlyRelevantTypes;
    tracer("Reject Lexer.NA", function () {
        onlyRelevantTypes = (0,utils/* reject */.d1)(tokenTypes, function (currType) {
            return currType[PATTERN] === Lexer.NA;
        });
    });
    var hasCustom = false;
    var allTransformedPatterns;
    tracer("Transform Patterns", function () {
        hasCustom = false;
        allTransformedPatterns = (0,utils/* map */.UI)(onlyRelevantTypes, function (currType) {
            var currPattern = currType[PATTERN];
            /* istanbul ignore else */
            if ((0,utils/* isRegExp */.Kj)(currPattern)) {
                var regExpSource = currPattern.source;
                if (regExpSource.length === 1 &&
                    // only these regExp meta characters which can appear in a length one regExp
                    regExpSource !== "^" &&
                    regExpSource !== "$" &&
                    regExpSource !== "." &&
                    !currPattern.ignoreCase) {
                    return regExpSource;
                }
                else if (regExpSource.length === 2 &&
                    regExpSource[0] === "\\" &&
                    // not a meta character
                    !(0,utils/* contains */.r3)([
                        "d",
                        "D",
                        "s",
                        "S",
                        "t",
                        "r",
                        "n",
                        "t",
                        "0",
                        "c",
                        "b",
                        "B",
                        "f",
                        "v",
                        "w",
                        "W"
                    ], regExpSource[1])) {
                    // escaped meta Characters: /\+/ /\[/
                    // or redundant escaping: /\a/
                    // without the escaping "\"
                    return regExpSource[1];
                }
                else {
                    return options.useSticky
                        ? addStickyFlag(currPattern)
                        : addStartOfInput(currPattern);
                }
            }
            else if ((0,utils/* isFunction */.mf)(currPattern)) {
                hasCustom = true;
                // CustomPatternMatcherFunc - custom patterns do not require any transformations, only wrapping in a RegExp Like object
                return { exec: currPattern };
            }
            else if ((0,utils/* has */.e$)(currPattern, "exec")) {
                hasCustom = true;
                // ICustomPattern
                return currPattern;
            }
            else if (typeof currPattern === "string") {
                if (currPattern.length === 1) {
                    return currPattern;
                }
                else {
                    var escapedRegExpString = currPattern.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
                    var wrappedRegExp = new RegExp(escapedRegExpString);
                    return options.useSticky
                        ? addStickyFlag(wrappedRegExp)
                        : addStartOfInput(wrappedRegExp);
                }
            }
            else {
                throw Error("non exhaustive match");
            }
        });
    });
    var patternIdxToType;
    var patternIdxToGroup;
    var patternIdxToLongerAltIdx;
    var patternIdxToPushMode;
    var patternIdxToPopMode;
    tracer("misc mapping", function () {
        patternIdxToType = (0,utils/* map */.UI)(onlyRelevantTypes, function (currType) { return currType.tokenTypeIdx; });
        patternIdxToGroup = (0,utils/* map */.UI)(onlyRelevantTypes, function (clazz) {
            var groupName = clazz.GROUP;
            /* istanbul ignore next */
            if (groupName === Lexer.SKIPPED) {
                return undefined;
            }
            else if ((0,utils/* isString */.HD)(groupName)) {
                return groupName;
            }
            else if ((0,utils/* isUndefined */.o8)(groupName)) {
                return false;
            }
            else {
                throw Error("non exhaustive match");
            }
        });
        patternIdxToLongerAltIdx = (0,utils/* map */.UI)(onlyRelevantTypes, function (clazz) {
            var longerAltType = clazz.LONGER_ALT;
            if (longerAltType) {
                var longerAltIdx = (0,utils/* indexOf */.cq)(onlyRelevantTypes, longerAltType);
                return longerAltIdx;
            }
        });
        patternIdxToPushMode = (0,utils/* map */.UI)(onlyRelevantTypes, function (clazz) { return clazz.PUSH_MODE; });
        patternIdxToPopMode = (0,utils/* map */.UI)(onlyRelevantTypes, function (clazz) {
            return (0,utils/* has */.e$)(clazz, "POP_MODE");
        });
    });
    var patternIdxToCanLineTerminator;
    tracer("Line Terminator Handling", function () {
        var lineTerminatorCharCodes = getCharCodes(options.lineTerminatorCharacters);
        patternIdxToCanLineTerminator = (0,utils/* map */.UI)(onlyRelevantTypes, function (tokType) { return false; });
        if (options.positionTracking !== "onlyOffset") {
            patternIdxToCanLineTerminator = (0,utils/* map */.UI)(onlyRelevantTypes, function (tokType) {
                if ((0,utils/* has */.e$)(tokType, "LINE_BREAKS")) {
                    return tokType.LINE_BREAKS;
                }
                else {
                    if (checkLineBreaksIssues(tokType, lineTerminatorCharCodes) === false) {
                        return canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
                    }
                }
            });
        }
    });
    var patternIdxToIsCustom;
    var patternIdxToShort;
    var emptyGroups;
    var patternIdxToConfig;
    tracer("Misc Mapping #2", function () {
        patternIdxToIsCustom = (0,utils/* map */.UI)(onlyRelevantTypes, isCustomPattern);
        patternIdxToShort = (0,utils/* map */.UI)(allTransformedPatterns, isShortPattern);
        emptyGroups = (0,utils/* reduce */.u4)(onlyRelevantTypes, function (acc, clazz) {
            var groupName = clazz.GROUP;
            if ((0,utils/* isString */.HD)(groupName) && !(groupName === Lexer.SKIPPED)) {
                acc[groupName] = [];
            }
            return acc;
        }, {});
        patternIdxToConfig = (0,utils/* map */.UI)(allTransformedPatterns, function (x, idx) {
            return {
                pattern: allTransformedPatterns[idx],
                longerAlt: patternIdxToLongerAltIdx[idx],
                canLineTerminator: patternIdxToCanLineTerminator[idx],
                isCustom: patternIdxToIsCustom[idx],
                short: patternIdxToShort[idx],
                group: patternIdxToGroup[idx],
                push: patternIdxToPushMode[idx],
                pop: patternIdxToPopMode[idx],
                tokenTypeIdx: patternIdxToType[idx],
                tokenType: onlyRelevantTypes[idx]
            };
        });
    });
    var canBeOptimized = true;
    var charCodeToPatternIdxToConfig = [];
    if (!options.safeMode) {
        tracer("First Char Optimization", function () {
            charCodeToPatternIdxToConfig = (0,utils/* reduce */.u4)(onlyRelevantTypes, function (result, currTokType, idx) {
                if (typeof currTokType.PATTERN === "string") {
                    var charCode = currTokType.PATTERN.charCodeAt(0);
                    var optimizedIdx = charCodeToOptimizedIndex(charCode);
                    addToMapOfArrays(result, optimizedIdx, patternIdxToConfig[idx]);
                }
                else if ((0,utils/* isArray */.kJ)(currTokType.START_CHARS_HINT)) {
                    var lastOptimizedIdx_1;
                    (0,utils/* forEach */.Ed)(currTokType.START_CHARS_HINT, function (charOrInt) {
                        var charCode = typeof charOrInt === "string"
                            ? charOrInt.charCodeAt(0)
                            : charOrInt;
                        var currOptimizedIdx = charCodeToOptimizedIndex(charCode);
                        // Avoid adding the config multiple times
                        /* istanbul ignore else */
                        // - Difficult to check this scenario effects as it is only a performance
                        //   optimization that does not change correctness
                        if (lastOptimizedIdx_1 !== currOptimizedIdx) {
                            lastOptimizedIdx_1 = currOptimizedIdx;
                            addToMapOfArrays(result, currOptimizedIdx, patternIdxToConfig[idx]);
                        }
                    });
                }
                else if ((0,utils/* isRegExp */.Kj)(currTokType.PATTERN)) {
                    if (currTokType.PATTERN.unicode) {
                        canBeOptimized = false;
                        if (options.ensureOptimizations) {
                            (0,utils/* PRINT_ERROR */.WB)("" + failedOptimizationPrefixMsg +
                                ("\tUnable to analyze < " + currTokType.PATTERN.toString() + " > pattern.\n") +
                                "\tThe regexp unicode flag is not currently supported by the regexp-to-ast library.\n" +
                                "\tThis will disable the lexer's first char optimizations.\n" +
                                "\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE");
                        }
                    }
                    else {
                        var optimizedCodes = getOptimizedStartCodesIndices(currTokType.PATTERN, options.ensureOptimizations);
                        /* istanbul ignore if */
                        // start code will only be empty given an empty regExp or failure of regexp-to-ast library
                        // the first should be a different validation and the second cannot be tested.
                        if ((0,utils/* isEmpty */.xb)(optimizedCodes)) {
                            // we cannot understand what codes may start possible matches
                            // The optimization correctness requires knowing start codes for ALL patterns.
                            // Not actually sure this is an error, no debug message
                            canBeOptimized = false;
                        }
                        (0,utils/* forEach */.Ed)(optimizedCodes, function (code) {
                            addToMapOfArrays(result, code, patternIdxToConfig[idx]);
                        });
                    }
                }
                else {
                    if (options.ensureOptimizations) {
                        (0,utils/* PRINT_ERROR */.WB)("" + failedOptimizationPrefixMsg +
                            ("\tTokenType: <" + currTokType.name + "> is using a custom token pattern without providing <start_chars_hint> parameter.\n") +
                            "\tThis will disable the lexer's first char optimizations.\n" +
                            "\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE");
                    }
                    canBeOptimized = false;
                }
                return result;
            }, []);
        });
    }
    tracer("ArrayPacking", function () {
        charCodeToPatternIdxToConfig = (0,utils/* packArray */.X0)(charCodeToPatternIdxToConfig);
    });
    return {
        emptyGroups: emptyGroups,
        patternIdxToConfig: patternIdxToConfig,
        charCodeToPatternIdxToConfig: charCodeToPatternIdxToConfig,
        hasCustom: hasCustom,
        canBeOptimized: canBeOptimized
    };
}
function validatePatterns(tokenTypes, validModesNames) {
    var errors = [];
    var missingResult = findMissingPatterns(tokenTypes);
    errors = errors.concat(missingResult.errors);
    var invalidResult = findInvalidPatterns(missingResult.valid);
    var validTokenTypes = invalidResult.valid;
    errors = errors.concat(invalidResult.errors);
    errors = errors.concat(validateRegExpPattern(validTokenTypes));
    errors = errors.concat(findInvalidGroupType(validTokenTypes));
    errors = errors.concat(findModesThatDoNotExist(validTokenTypes, validModesNames));
    errors = errors.concat(findUnreachablePatterns(validTokenTypes));
    return errors;
}
function validateRegExpPattern(tokenTypes) {
    var errors = [];
    var withRegExpPatterns = (0,utils/* filter */.hX)(tokenTypes, function (currTokType) {
        return (0,utils/* isRegExp */.Kj)(currTokType[PATTERN]);
    });
    errors = errors.concat(findEndOfInputAnchor(withRegExpPatterns));
    errors = errors.concat(findStartOfInputAnchor(withRegExpPatterns));
    errors = errors.concat(findUnsupportedFlags(withRegExpPatterns));
    errors = errors.concat(findDuplicatePatterns(withRegExpPatterns));
    errors = errors.concat(findEmptyMatchRegExps(withRegExpPatterns));
    return errors;
}
function findMissingPatterns(tokenTypes) {
    var tokenTypesWithMissingPattern = (0,utils/* filter */.hX)(tokenTypes, function (currType) {
        return !(0,utils/* has */.e$)(currType, PATTERN);
    });
    var errors = (0,utils/* map */.UI)(tokenTypesWithMissingPattern, function (currType) {
        return {
            message: "Token Type: ->" +
                currType.name +
                "<- missing static 'PATTERN' property",
            type: LexerDefinitionErrorType.MISSING_PATTERN,
            tokenTypes: [currType]
        };
    });
    var valid = (0,utils/* difference */.e5)(tokenTypes, tokenTypesWithMissingPattern);
    return { errors: errors, valid: valid };
}
function findInvalidPatterns(tokenTypes) {
    var tokenTypesWithInvalidPattern = (0,utils/* filter */.hX)(tokenTypes, function (currType) {
        var pattern = currType[PATTERN];
        return (!(0,utils/* isRegExp */.Kj)(pattern) &&
            !(0,utils/* isFunction */.mf)(pattern) &&
            !(0,utils/* has */.e$)(pattern, "exec") &&
            !(0,utils/* isString */.HD)(pattern));
    });
    var errors = (0,utils/* map */.UI)(tokenTypesWithInvalidPattern, function (currType) {
        return {
            message: "Token Type: ->" +
                currType.name +
                "<- static 'PATTERN' can only be a RegExp, a" +
                " Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
            type: LexerDefinitionErrorType.INVALID_PATTERN,
            tokenTypes: [currType]
        };
    });
    var valid = (0,utils/* difference */.e5)(tokenTypes, tokenTypesWithInvalidPattern);
    return { errors: errors, valid: valid };
}
var end_of_input = /[^\\][\$]/;
function findEndOfInputAnchor(tokenTypes) {
    var EndAnchorFinder = /** @class */ (function (_super) {
        lexer_extends(EndAnchorFinder, _super);
        function EndAnchorFinder() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.found = false;
            return _this;
        }
        EndAnchorFinder.prototype.visitEndAnchor = function (node) {
            this.found = true;
        };
        return EndAnchorFinder;
    }(regexp_to_ast.BaseRegExpVisitor));
    var invalidRegex = (0,utils/* filter */.hX)(tokenTypes, function (currType) {
        var pattern = currType[PATTERN];
        try {
            var regexpAst = getRegExpAst(pattern);
            var endAnchorVisitor = new EndAnchorFinder();
            endAnchorVisitor.visit(regexpAst);
            return endAnchorVisitor.found;
        }
        catch (e) {
            // old behavior in case of runtime exceptions with regexp-to-ast.
            /* istanbul ignore next - cannot ensure an error in regexp-to-ast*/
            return end_of_input.test(pattern.source);
        }
    });
    var errors = (0,utils/* map */.UI)(invalidRegex, function (currType) {
        return {
            message: "Unexpected RegExp Anchor Error:\n" +
                "\tToken Type: ->" +
                currType.name +
                "<- static 'PATTERN' cannot contain end of input anchor '$'\n" +
                "\tSee sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS" +
                "\tfor details.",
            type: LexerDefinitionErrorType.EOI_ANCHOR_FOUND,
            tokenTypes: [currType]
        };
    });
    return errors;
}
function findEmptyMatchRegExps(tokenTypes) {
    var matchesEmptyString = (0,utils/* filter */.hX)(tokenTypes, function (currType) {
        var pattern = currType[PATTERN];
        return pattern.test("");
    });
    var errors = (0,utils/* map */.UI)(matchesEmptyString, function (currType) {
        return {
            message: "Token Type: ->" +
                currType.name +
                "<- static 'PATTERN' must not match an empty string",
            type: LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,
            tokenTypes: [currType]
        };
    });
    return errors;
}
var start_of_input = /[^\\[][\^]|^\^/;
function findStartOfInputAnchor(tokenTypes) {
    var StartAnchorFinder = /** @class */ (function (_super) {
        lexer_extends(StartAnchorFinder, _super);
        function StartAnchorFinder() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.found = false;
            return _this;
        }
        StartAnchorFinder.prototype.visitStartAnchor = function (node) {
            this.found = true;
        };
        return StartAnchorFinder;
    }(regexp_to_ast.BaseRegExpVisitor));
    var invalidRegex = (0,utils/* filter */.hX)(tokenTypes, function (currType) {
        var pattern = currType[PATTERN];
        try {
            var regexpAst = getRegExpAst(pattern);
            var startAnchorVisitor = new StartAnchorFinder();
            startAnchorVisitor.visit(regexpAst);
            return startAnchorVisitor.found;
        }
        catch (e) {
            // old behavior in case of runtime exceptions with regexp-to-ast.
            /* istanbul ignore next - cannot ensure an error in regexp-to-ast*/
            return start_of_input.test(pattern.source);
        }
    });
    var errors = (0,utils/* map */.UI)(invalidRegex, function (currType) {
        return {
            message: "Unexpected RegExp Anchor Error:\n" +
                "\tToken Type: ->" +
                currType.name +
                "<- static 'PATTERN' cannot contain start of input anchor '^'\n" +
                "\tSee https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS" +
                "\tfor details.",
            type: LexerDefinitionErrorType.SOI_ANCHOR_FOUND,
            tokenTypes: [currType]
        };
    });
    return errors;
}
function findUnsupportedFlags(tokenTypes) {
    var invalidFlags = (0,utils/* filter */.hX)(tokenTypes, function (currType) {
        var pattern = currType[PATTERN];
        return pattern instanceof RegExp && (pattern.multiline || pattern.global);
    });
    var errors = (0,utils/* map */.UI)(invalidFlags, function (currType) {
        return {
            message: "Token Type: ->" +
                currType.name +
                "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
            type: LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,
            tokenTypes: [currType]
        };
    });
    return errors;
}
// This can only test for identical duplicate RegExps, not semantically equivalent ones.
function findDuplicatePatterns(tokenTypes) {
    var found = [];
    var identicalPatterns = (0,utils/* map */.UI)(tokenTypes, function (outerType) {
        return (0,utils/* reduce */.u4)(tokenTypes, function (result, innerType) {
            if (outerType.PATTERN.source === innerType.PATTERN.source &&
                !(0,utils/* contains */.r3)(found, innerType) &&
                innerType.PATTERN !== Lexer.NA) {
                // this avoids duplicates in the result, each Token Type may only appear in one "set"
                // in essence we are creating Equivalence classes on equality relation.
                found.push(innerType);
                result.push(innerType);
                return result;
            }
            return result;
        }, []);
    });
    identicalPatterns = (0,utils/* compact */.oA)(identicalPatterns);
    var duplicatePatterns = (0,utils/* filter */.hX)(identicalPatterns, function (currIdenticalSet) {
        return currIdenticalSet.length > 1;
    });
    var errors = (0,utils/* map */.UI)(duplicatePatterns, function (setOfIdentical) {
        var tokenTypeNames = (0,utils/* map */.UI)(setOfIdentical, function (currType) {
            return currType.name;
        });
        var dupPatternSrc = (0,utils/* first */.Ps)(setOfIdentical).PATTERN;
        return {
            message: "The same RegExp pattern ->" + dupPatternSrc + "<-" +
                ("has been used in all of the following Token Types: " + tokenTypeNames.join(", ") + " <-"),
            type: LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,
            tokenTypes: setOfIdentical
        };
    });
    return errors;
}
function findInvalidGroupType(tokenTypes) {
    var invalidTypes = (0,utils/* filter */.hX)(tokenTypes, function (clazz) {
        if (!(0,utils/* has */.e$)(clazz, "GROUP")) {
            return false;
        }
        var group = clazz.GROUP;
        return group !== Lexer.SKIPPED && group !== Lexer.NA && !(0,utils/* isString */.HD)(group);
    });
    var errors = (0,utils/* map */.UI)(invalidTypes, function (currType) {
        return {
            message: "Token Type: ->" +
                currType.name +
                "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
            type: LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,
            tokenTypes: [currType]
        };
    });
    return errors;
}
function findModesThatDoNotExist(tokenTypes, validModes) {
    var invalidModes = (0,utils/* filter */.hX)(tokenTypes, function (clazz) {
        return (clazz.PUSH_MODE !== undefined && !(0,utils/* contains */.r3)(validModes, clazz.PUSH_MODE));
    });
    var errors = (0,utils/* map */.UI)(invalidModes, function (tokType) {
        var msg = "Token Type: ->" + tokType.name + "<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->" + tokType.PUSH_MODE + "<-" +
            "which does not exist";
        return {
            message: msg,
            type: LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,
            tokenTypes: [tokType]
        };
    });
    return errors;
}
function findUnreachablePatterns(tokenTypes) {
    var errors = [];
    var canBeTested = (0,utils/* reduce */.u4)(tokenTypes, function (result, tokType, idx) {
        var pattern = tokType.PATTERN;
        if (pattern === Lexer.NA) {
            return result;
        }
        // a more comprehensive validation for all forms of regExps would require
        // deeper regExp analysis capabilities
        if ((0,utils/* isString */.HD)(pattern)) {
            result.push({ str: pattern, idx: idx, tokenType: tokType });
        }
        else if ((0,utils/* isRegExp */.Kj)(pattern) && noMetaChar(pattern)) {
            result.push({ str: pattern.source, idx: idx, tokenType: tokType });
        }
        return result;
    }, []);
    (0,utils/* forEach */.Ed)(tokenTypes, function (tokType, testIdx) {
        (0,utils/* forEach */.Ed)(canBeTested, function (_a) {
            var str = _a.str, idx = _a.idx, tokenType = _a.tokenType;
            if (testIdx < idx && testTokenType(str, tokType.PATTERN)) {
                var msg = "Token: ->" + tokenType.name + "<- can never be matched.\n" +
                    ("Because it appears AFTER the Token Type ->" + tokType.name + "<-") +
                    "in the lexer's definition.\n" +
                    "See https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNREACHABLE";
                errors.push({
                    message: msg,
                    type: LexerDefinitionErrorType.UNREACHABLE_PATTERN,
                    tokenTypes: [tokType, tokenType]
                });
            }
        });
    });
    return errors;
}
function testTokenType(str, pattern) {
    /* istanbul ignore else */
    if ((0,utils/* isRegExp */.Kj)(pattern)) {
        var regExpArray = pattern.exec(str);
        return regExpArray !== null && regExpArray.index === 0;
    }
    else if ((0,utils/* isFunction */.mf)(pattern)) {
        // maintain the API of custom patterns
        return pattern(str, 0, [], {});
    }
    else if ((0,utils/* has */.e$)(pattern, "exec")) {
        // maintain the API of custom patterns
        return pattern.exec(str, 0, [], {});
    }
    else if (typeof pattern === "string") {
        return pattern === str;
    }
    else {
        throw Error("non exhaustive match");
    }
}
function noMetaChar(regExp) {
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    var metaChars = [
        ".",
        "\\",
        "[",
        "]",
        "|",
        "^",
        "$",
        "(",
        ")",
        "?",
        "*",
        "+",
        "{"
    ];
    return ((0,utils/* find */.sE)(metaChars, function (char) { return regExp.source.indexOf(char) !== -1; }) === undefined);
}
function addStartOfInput(pattern) {
    var flags = pattern.ignoreCase ? "i" : "";
    // always wrapping in a none capturing group preceded by '^' to make sure matching can only work on start of input.
    // duplicate/redundant start of input markers have no meaning (/^^^^A/ === /^A/)
    return new RegExp("^(?:" + pattern.source + ")", flags);
}
function addStickyFlag(pattern) {
    var flags = pattern.ignoreCase ? "iy" : "y";
    // always wrapping in a none capturing group preceded by '^' to make sure matching can only work on start of input.
    // duplicate/redundant start of input markers have no meaning (/^^^^A/ === /^A/)
    return new RegExp("" + pattern.source, flags);
}
function performRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
    var errors = [];
    // some run time checks to help the end users.
    if (!(0,utils/* has */.e$)(lexerDefinition, DEFAULT_MODE)) {
        errors.push({
            message: "A MultiMode Lexer cannot be initialized without a <" +
                DEFAULT_MODE +
                "> property in its definition\n",
            type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
        });
    }
    if (!(0,utils/* has */.e$)(lexerDefinition, MODES)) {
        errors.push({
            message: "A MultiMode Lexer cannot be initialized without a <" +
                MODES +
                "> property in its definition\n",
            type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
        });
    }
    if ((0,utils/* has */.e$)(lexerDefinition, MODES) &&
        (0,utils/* has */.e$)(lexerDefinition, DEFAULT_MODE) &&
        !(0,utils/* has */.e$)(lexerDefinition.modes, lexerDefinition.defaultMode)) {
        errors.push({
            message: "A MultiMode Lexer cannot be initialized with a " + DEFAULT_MODE + ": <" + lexerDefinition.defaultMode + ">" +
                "which does not exist\n",
            type: LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
        });
    }
    if ((0,utils/* has */.e$)(lexerDefinition, MODES)) {
        (0,utils/* forEach */.Ed)(lexerDefinition.modes, function (currModeValue, currModeName) {
            (0,utils/* forEach */.Ed)(currModeValue, function (currTokType, currIdx) {
                if ((0,utils/* isUndefined */.o8)(currTokType)) {
                    errors.push({
                        message: "A Lexer cannot be initialized using an undefined Token Type. Mode:" +
                            ("<" + currModeName + "> at index: <" + currIdx + ">\n"),
                        type: LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
                    });
                }
            });
        });
    }
    return errors;
}
function performWarningRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
    var warnings = [];
    var hasAnyLineBreak = false;
    var allTokenTypes = (0,utils/* compact */.oA)((0,utils/* flatten */.xH)((0,utils/* mapValues */.Q8)(lexerDefinition.modes, function (tokTypes) { return tokTypes; })));
    var concreteTokenTypes = (0,utils/* reject */.d1)(allTokenTypes, function (currType) { return currType[PATTERN] === Lexer.NA; });
    var terminatorCharCodes = getCharCodes(lineTerminatorCharacters);
    if (trackLines) {
        (0,utils/* forEach */.Ed)(concreteTokenTypes, function (tokType) {
            var currIssue = checkLineBreaksIssues(tokType, terminatorCharCodes);
            if (currIssue !== false) {
                var message = buildLineBreakIssueMessage(tokType, currIssue);
                var warningDescriptor = {
                    message: message,
                    type: currIssue.issue,
                    tokenType: tokType
                };
                warnings.push(warningDescriptor);
            }
            else {
                // we don't want to attempt to scan if the user explicitly specified the line_breaks option.
                if ((0,utils/* has */.e$)(tokType, "LINE_BREAKS")) {
                    if (tokType.LINE_BREAKS === true) {
                        hasAnyLineBreak = true;
                    }
                }
                else {
                    if (canMatchCharCode(terminatorCharCodes, tokType.PATTERN)) {
                        hasAnyLineBreak = true;
                    }
                }
            }
        });
    }
    if (trackLines && !hasAnyLineBreak) {
        warnings.push({
            message: "Warning: No LINE_BREAKS Found.\n" +
                "\tThis Lexer has been defined to track line and column information,\n" +
                "\tBut none of the Token Types can be identified as matching a line terminator.\n" +
                "\tSee https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#LINE_BREAKS \n" +
                "\tfor details.",
            type: LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS
        });
    }
    return warnings;
}
function cloneEmptyGroups(emptyGroups) {
    var clonedResult = {};
    var groupKeys = (0,utils/* keys */.XP)(emptyGroups);
    (0,utils/* forEach */.Ed)(groupKeys, function (currKey) {
        var currGroupValue = emptyGroups[currKey];
        /* istanbul ignore else */
        if ((0,utils/* isArray */.kJ)(currGroupValue)) {
            clonedResult[currKey] = [];
        }
        else {
            throw Error("non exhaustive match");
        }
    });
    return clonedResult;
}
// TODO: refactor to avoid duplication
function isCustomPattern(tokenType) {
    var pattern = tokenType.PATTERN;
    /* istanbul ignore else */
    if ((0,utils/* isRegExp */.Kj)(pattern)) {
        return false;
    }
    else if ((0,utils/* isFunction */.mf)(pattern)) {
        // CustomPatternMatcherFunc - custom patterns do not require any transformations, only wrapping in a RegExp Like object
        return true;
    }
    else if ((0,utils/* has */.e$)(pattern, "exec")) {
        // ICustomPattern
        return true;
    }
    else if ((0,utils/* isString */.HD)(pattern)) {
        return false;
    }
    else {
        throw Error("non exhaustive match");
    }
}
function isShortPattern(pattern) {
    if ((0,utils/* isString */.HD)(pattern) && pattern.length === 1) {
        return pattern.charCodeAt(0);
    }
    else {
        return false;
    }
}
/**
 * Faster than using a RegExp for default newline detection during lexing.
 */
var LineTerminatorOptimizedTester = {
    // implements /\n|\r\n?/g.test
    test: function (text) {
        var len = text.length;
        for (var i = this.lastIndex; i < len; i++) {
            var c = text.charCodeAt(i);
            if (c === 10) {
                this.lastIndex = i + 1;
                return true;
            }
            else if (c === 13) {
                if (text.charCodeAt(i + 1) === 10) {
                    this.lastIndex = i + 2;
                }
                else {
                    this.lastIndex = i + 1;
                }
                return true;
            }
        }
        return false;
    },
    lastIndex: 0
};
function checkLineBreaksIssues(tokType, lineTerminatorCharCodes) {
    if ((0,utils/* has */.e$)(tokType, "LINE_BREAKS")) {
        // if the user explicitly declared the line_breaks option we will respect their choice
        // and assume it is correct.
        return false;
    }
    else {
        /* istanbul ignore else */
        if ((0,utils/* isRegExp */.Kj)(tokType.PATTERN)) {
            try {
                canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
            }
            catch (e) {
                /* istanbul ignore next - to test this we would have to mock <canMatchCharCode> to throw an error */
                return {
                    issue: LexerDefinitionErrorType.IDENTIFY_TERMINATOR,
                    errMsg: e.message
                };
            }
            return false;
        }
        else if ((0,utils/* isString */.HD)(tokType.PATTERN)) {
            // string literal patterns can always be analyzed to detect line terminator usage
            return false;
        }
        else if (isCustomPattern(tokType)) {
            // custom token types
            return { issue: LexerDefinitionErrorType.CUSTOM_LINE_BREAK };
        }
        else {
            throw Error("non exhaustive match");
        }
    }
}
function buildLineBreakIssueMessage(tokType, details) {
    /* istanbul ignore else */
    if (details.issue === LexerDefinitionErrorType.IDENTIFY_TERMINATOR) {
        return ("Warning: unable to identify line terminator usage in pattern.\n" +
            ("\tThe problem is in the <" + tokType.name + "> Token Type\n") +
            ("\t Root cause: " + details.errMsg + ".\n") +
            "\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR");
    }
    else if (details.issue === LexerDefinitionErrorType.CUSTOM_LINE_BREAK) {
        return ("Warning: A Custom Token Pattern should specify the <line_breaks> option.\n" +
            ("\tThe problem is in the <" + tokType.name + "> Token Type\n") +
            "\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK");
    }
    else {
        throw Error("non exhaustive match");
    }
}
function getCharCodes(charsOrCodes) {
    var charCodes = (0,utils/* map */.UI)(charsOrCodes, function (numOrString) {
        if ((0,utils/* isString */.HD)(numOrString) && numOrString.length > 0) {
            return numOrString.charCodeAt(0);
        }
        else {
            return numOrString;
        }
    });
    return charCodes;
}
function addToMapOfArrays(map, key, value) {
    if (map[key] === undefined) {
        map[key] = [value];
    }
    else {
        map[key].push(value);
    }
}
var minOptimizationVal = 256;
/**
 * We ae mapping charCode above ASCI (256) into buckets each in the size of 256.
 * This is because ASCI are the most common start chars so each one of those will get its own
 * possible token configs vector.
 *
 * Tokens starting with charCodes "above" ASCI are uncommon, so we can "afford"
 * to place these into buckets of possible token configs, What we gain from
 * this is avoiding the case of creating an optimization 'charCodeToPatternIdxToConfig'
 * which would contain 10,000+ arrays of small size (e.g unicode Identifiers scenario).
 * Our 'charCodeToPatternIdxToConfig' max size will now be:
 * 256 + (2^16 / 2^8) - 1 === 511
 *
 * note the hack for fast division integer part extraction
 * See: https://stackoverflow.com/a/4228528
 */
function charCodeToOptimizedIndex(charCode) {
    return charCode < minOptimizationVal
        ? charCode
        : charCodeToOptimizedIdxMap[charCode];
}
/**
 * This is a compromise between cold start / hot running performance
 * Creating this array takes ~3ms on a modern machine,
 * But if we perform the computation at runtime as needed the CSS Lexer benchmark
 * performance degrades by ~10%
 *
 * TODO: Perhaps it should be lazy initialized only if a charCode > 255 is used.
 */
var charCodeToOptimizedIdxMap = [];
function initCharCodeToOptimizedIndexMap() {
    if ((0,utils/* isEmpty */.xb)(charCodeToOptimizedIdxMap)) {
        charCodeToOptimizedIdxMap = new Array(65536);
        for (var i = 0; i < 65536; i++) {
            /* tslint:disable */
            charCodeToOptimizedIdxMap[i] = i > 255 ? 255 + ~~(i / 255) : i;
            /* tslint:enable */
        }
    }
}
//# sourceMappingURL=lexer.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/scan/tokens.js

function tokenStructuredMatcher(tokInstance, tokConstructor) {
    var instanceType = tokInstance.tokenTypeIdx;
    if (instanceType === tokConstructor.tokenTypeIdx) {
        return true;
    }
    else {
        return (tokConstructor.isParent === true &&
            tokConstructor.categoryMatchesMap[instanceType] === true);
    }
}
// Optimized tokenMatcher in case our grammar does not use token categories
// Being so tiny it is much more likely to be in-lined and this avoid the function call overhead
function tokenStructuredMatcherNoCategories(token, tokType) {
    return token.tokenTypeIdx === tokType.tokenTypeIdx;
}
var tokenShortNameIdx = 1;
var tokenIdxToClass = {};
function augmentTokenTypes(tokenTypes) {
    // collect the parent Token Types as well.
    var tokenTypesAndParents = expandCategories(tokenTypes);
    // add required tokenType and categoryMatches properties
    assignTokenDefaultProps(tokenTypesAndParents);
    // fill up the categoryMatches
    assignCategoriesMapProp(tokenTypesAndParents);
    assignCategoriesTokensProp(tokenTypesAndParents);
    (0,utils/* forEach */.Ed)(tokenTypesAndParents, function (tokType) {
        tokType.isParent = tokType.categoryMatches.length > 0;
    });
}
function expandCategories(tokenTypes) {
    var result = (0,utils/* cloneArr */.Qw)(tokenTypes);
    var categories = tokenTypes;
    var searching = true;
    while (searching) {
        categories = (0,utils/* compact */.oA)((0,utils/* flatten */.xH)((0,utils/* map */.UI)(categories, function (currTokType) { return currTokType.CATEGORIES; })));
        var newCategories = (0,utils/* difference */.e5)(categories, result);
        result = result.concat(newCategories);
        if ((0,utils/* isEmpty */.xb)(newCategories)) {
            searching = false;
        }
        else {
            categories = newCategories;
        }
    }
    return result;
}
function assignTokenDefaultProps(tokenTypes) {
    (0,utils/* forEach */.Ed)(tokenTypes, function (currTokType) {
        if (!hasShortKeyProperty(currTokType)) {
            tokenIdxToClass[tokenShortNameIdx] = currTokType;
            currTokType.tokenTypeIdx = tokenShortNameIdx++;
        }
        // CATEGORIES? : TokenType | TokenType[]
        if (hasCategoriesProperty(currTokType) &&
            !(0,utils/* isArray */.kJ)(currTokType.CATEGORIES)
        // &&
        // !isUndefined(currTokType.CATEGORIES.PATTERN)
        ) {
            currTokType.CATEGORIES = [currTokType.CATEGORIES];
        }
        if (!hasCategoriesProperty(currTokType)) {
            currTokType.CATEGORIES = [];
        }
        if (!hasExtendingTokensTypesProperty(currTokType)) {
            currTokType.categoryMatches = [];
        }
        if (!hasExtendingTokensTypesMapProperty(currTokType)) {
            currTokType.categoryMatchesMap = {};
        }
    });
}
function assignCategoriesTokensProp(tokenTypes) {
    (0,utils/* forEach */.Ed)(tokenTypes, function (currTokType) {
        // avoid duplications
        currTokType.categoryMatches = [];
        (0,utils/* forEach */.Ed)(currTokType.categoryMatchesMap, function (val, key) {
            currTokType.categoryMatches.push(tokenIdxToClass[key].tokenTypeIdx);
        });
    });
}
function assignCategoriesMapProp(tokenTypes) {
    (0,utils/* forEach */.Ed)(tokenTypes, function (currTokType) {
        singleAssignCategoriesToksMap([], currTokType);
    });
}
function singleAssignCategoriesToksMap(path, nextNode) {
    (0,utils/* forEach */.Ed)(path, function (pathNode) {
        nextNode.categoryMatchesMap[pathNode.tokenTypeIdx] = true;
    });
    (0,utils/* forEach */.Ed)(nextNode.CATEGORIES, function (nextCategory) {
        var newPath = path.concat(nextNode);
        // avoids infinite loops due to cyclic categories.
        if (!(0,utils/* contains */.r3)(newPath, nextCategory)) {
            singleAssignCategoriesToksMap(newPath, nextCategory);
        }
    });
}
function hasShortKeyProperty(tokType) {
    return (0,utils/* has */.e$)(tokType, "tokenTypeIdx");
}
function hasCategoriesProperty(tokType) {
    return (0,utils/* has */.e$)(tokType, "CATEGORIES");
}
function hasExtendingTokensTypesProperty(tokType) {
    return (0,utils/* has */.e$)(tokType, "categoryMatches");
}
function hasExtendingTokensTypesMapProperty(tokType) {
    return (0,utils/* has */.e$)(tokType, "categoryMatchesMap");
}
function isTokenType(tokType) {
    return (0,utils/* has */.e$)(tokType, "tokenTypeIdx");
}
//# sourceMappingURL=tokens.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/scan/lexer_errors_public.js
var defaultLexerErrorProvider = {
    buildUnableToPopLexerModeMessage: function (token) {
        return "Unable to pop Lexer Mode after encountering Token ->" + token.image + "<- The Mode Stack is empty";
    },
    buildUnexpectedCharactersMessage: function (fullText, startOffset, length, line, column) {
        return ("unexpected character: ->" + fullText.charAt(startOffset) + "<- at offset: " + startOffset + "," + (" skipped " + length + " characters."));
    }
};
//# sourceMappingURL=lexer_errors_public.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/scan/lexer_public.js





var LexerDefinitionErrorType;
(function (LexerDefinitionErrorType) {
    LexerDefinitionErrorType[LexerDefinitionErrorType["MISSING_PATTERN"] = 0] = "MISSING_PATTERN";
    LexerDefinitionErrorType[LexerDefinitionErrorType["INVALID_PATTERN"] = 1] = "INVALID_PATTERN";
    LexerDefinitionErrorType[LexerDefinitionErrorType["EOI_ANCHOR_FOUND"] = 2] = "EOI_ANCHOR_FOUND";
    LexerDefinitionErrorType[LexerDefinitionErrorType["UNSUPPORTED_FLAGS_FOUND"] = 3] = "UNSUPPORTED_FLAGS_FOUND";
    LexerDefinitionErrorType[LexerDefinitionErrorType["DUPLICATE_PATTERNS_FOUND"] = 4] = "DUPLICATE_PATTERNS_FOUND";
    LexerDefinitionErrorType[LexerDefinitionErrorType["INVALID_GROUP_TYPE_FOUND"] = 5] = "INVALID_GROUP_TYPE_FOUND";
    LexerDefinitionErrorType[LexerDefinitionErrorType["PUSH_MODE_DOES_NOT_EXIST"] = 6] = "PUSH_MODE_DOES_NOT_EXIST";
    LexerDefinitionErrorType[LexerDefinitionErrorType["MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE"] = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE";
    LexerDefinitionErrorType[LexerDefinitionErrorType["MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY"] = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY";
    LexerDefinitionErrorType[LexerDefinitionErrorType["MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST"] = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST";
    LexerDefinitionErrorType[LexerDefinitionErrorType["LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED"] = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED";
    LexerDefinitionErrorType[LexerDefinitionErrorType["SOI_ANCHOR_FOUND"] = 11] = "SOI_ANCHOR_FOUND";
    LexerDefinitionErrorType[LexerDefinitionErrorType["EMPTY_MATCH_PATTERN"] = 12] = "EMPTY_MATCH_PATTERN";
    LexerDefinitionErrorType[LexerDefinitionErrorType["NO_LINE_BREAKS_FLAGS"] = 13] = "NO_LINE_BREAKS_FLAGS";
    LexerDefinitionErrorType[LexerDefinitionErrorType["UNREACHABLE_PATTERN"] = 14] = "UNREACHABLE_PATTERN";
    LexerDefinitionErrorType[LexerDefinitionErrorType["IDENTIFY_TERMINATOR"] = 15] = "IDENTIFY_TERMINATOR";
    LexerDefinitionErrorType[LexerDefinitionErrorType["CUSTOM_LINE_BREAK"] = 16] = "CUSTOM_LINE_BREAK";
})(LexerDefinitionErrorType || (LexerDefinitionErrorType = {}));
var DEFAULT_LEXER_CONFIG = {
    deferDefinitionErrorsHandling: false,
    positionTracking: "full",
    lineTerminatorsPattern: /\n|\r\n?/g,
    lineTerminatorCharacters: ["\n", "\r"],
    ensureOptimizations: false,
    safeMode: false,
    errorMessageProvider: defaultLexerErrorProvider,
    traceInitPerf: false,
    skipValidations: false
};
Object.freeze(DEFAULT_LEXER_CONFIG);
var Lexer = /** @class */ (function () {
    function Lexer(lexerDefinition, config) {
        var _this = this;
        if (config === void 0) { config = DEFAULT_LEXER_CONFIG; }
        this.lexerDefinition = lexerDefinition;
        this.lexerDefinitionErrors = [];
        this.lexerDefinitionWarning = [];
        this.patternIdxToConfig = {};
        this.charCodeToPatternIdxToConfig = {};
        this.modes = [];
        this.emptyGroups = {};
        this.config = undefined;
        this.trackStartLines = true;
        this.trackEndLines = true;
        this.hasCustom = false;
        this.canModeBeOptimized = {};
        if (typeof config === "boolean") {
            throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\n" +
                "a boolean 2nd argument is no longer supported");
        }
        // todo: defaults func?
        this.config = (0,utils/* merge */.TS)(DEFAULT_LEXER_CONFIG, config);
        var traceInitVal = this.config.traceInitPerf;
        if (traceInitVal === true) {
            this.traceInitMaxIdent = Infinity;
            this.traceInitPerf = true;
        }
        else if (typeof traceInitVal === "number") {
            this.traceInitMaxIdent = traceInitVal;
            this.traceInitPerf = true;
        }
        this.traceInitIndent = -1;
        this.TRACE_INIT("Lexer Constructor", function () {
            var actualDefinition;
            var hasOnlySingleMode = true;
            _this.TRACE_INIT("Lexer Config handling", function () {
                if (_this.config.lineTerminatorsPattern ===
                    DEFAULT_LEXER_CONFIG.lineTerminatorsPattern) {
                    // optimized built-in implementation for the defaults definition of lineTerminators
                    _this.config.lineTerminatorsPattern = LineTerminatorOptimizedTester;
                }
                else {
                    if (_this.config.lineTerminatorCharacters ===
                        DEFAULT_LEXER_CONFIG.lineTerminatorCharacters) {
                        throw Error("Error: Missing <lineTerminatorCharacters> property on the Lexer config.\n" +
                            "\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS");
                    }
                }
                if (config.safeMode && config.ensureOptimizations) {
                    throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
                }
                _this.trackStartLines = /full|onlyStart/i.test(_this.config.positionTracking);
                _this.trackEndLines = /full/i.test(_this.config.positionTracking);
                // Convert SingleModeLexerDefinition into a IMultiModeLexerDefinition.
                if ((0,utils/* isArray */.kJ)(lexerDefinition)) {
                    actualDefinition = { modes: {} };
                    actualDefinition.modes[DEFAULT_MODE] = (0,utils/* cloneArr */.Qw)(lexerDefinition);
                    actualDefinition[DEFAULT_MODE] = DEFAULT_MODE;
                }
                else {
                    // no conversion needed, input should already be a IMultiModeLexerDefinition
                    hasOnlySingleMode = false;
                    actualDefinition = (0,utils/* cloneObj */.Cl)(lexerDefinition);
                }
            });
            if (_this.config.skipValidations === false) {
                _this.TRACE_INIT("performRuntimeChecks", function () {
                    _this.lexerDefinitionErrors = _this.lexerDefinitionErrors.concat(performRuntimeChecks(actualDefinition, _this.trackStartLines, _this.config.lineTerminatorCharacters));
                });
                _this.TRACE_INIT("performWarningRuntimeChecks", function () {
                    _this.lexerDefinitionWarning = _this.lexerDefinitionWarning.concat(performWarningRuntimeChecks(actualDefinition, _this.trackStartLines, _this.config.lineTerminatorCharacters));
                });
            }
            // for extra robustness to avoid throwing an none informative error message
            actualDefinition.modes = actualDefinition.modes
                ? actualDefinition.modes
                : {};
            // an error of undefined TokenTypes will be detected in "performRuntimeChecks" above.
            // this transformation is to increase robustness in the case of partially invalid lexer definition.
            (0,utils/* forEach */.Ed)(actualDefinition.modes, function (currModeValue, currModeName) {
                actualDefinition.modes[currModeName] = (0,utils/* reject */.d1)(currModeValue, function (currTokType) { return (0,utils/* isUndefined */.o8)(currTokType); });
            });
            var allModeNames = (0,utils/* keys */.XP)(actualDefinition.modes);
            (0,utils/* forEach */.Ed)(actualDefinition.modes, function (currModDef, currModName) {
                _this.TRACE_INIT("Mode: <" + currModName + "> processing", function () {
                    _this.modes.push(currModName);
                    if (_this.config.skipValidations === false) {
                        _this.TRACE_INIT("validatePatterns", function () {
                            _this.lexerDefinitionErrors = _this.lexerDefinitionErrors.concat(validatePatterns(currModDef, allModeNames));
                        });
                    }
                    // If definition errors were encountered, the analysis phase may fail unexpectedly/
                    // Considering a lexer with definition errors may never be used, there is no point
                    // to performing the analysis anyhow...
                    if ((0,utils/* isEmpty */.xb)(_this.lexerDefinitionErrors)) {
                        augmentTokenTypes(currModDef);
                        var currAnalyzeResult_1;
                        _this.TRACE_INIT("analyzeTokenTypes", function () {
                            currAnalyzeResult_1 = analyzeTokenTypes(currModDef, {
                                lineTerminatorCharacters: _this.config
                                    .lineTerminatorCharacters,
                                positionTracking: config.positionTracking,
                                ensureOptimizations: config.ensureOptimizations,
                                safeMode: config.safeMode,
                                tracer: _this.TRACE_INIT.bind(_this)
                            });
                        });
                        _this.patternIdxToConfig[currModName] =
                            currAnalyzeResult_1.patternIdxToConfig;
                        _this.charCodeToPatternIdxToConfig[currModName] =
                            currAnalyzeResult_1.charCodeToPatternIdxToConfig;
                        _this.emptyGroups = (0,utils/* merge */.TS)(_this.emptyGroups, currAnalyzeResult_1.emptyGroups);
                        _this.hasCustom = currAnalyzeResult_1.hasCustom || _this.hasCustom;
                        _this.canModeBeOptimized[currModName] =
                            currAnalyzeResult_1.canBeOptimized;
                    }
                });
            });
            _this.defaultMode = actualDefinition.defaultMode;
            if (!(0,utils/* isEmpty */.xb)(_this.lexerDefinitionErrors) &&
                !_this.config.deferDefinitionErrorsHandling) {
                var allErrMessages = (0,utils/* map */.UI)(_this.lexerDefinitionErrors, function (error) {
                    return error.message;
                });
                var allErrMessagesString = allErrMessages.join("-----------------------\n");
                throw new Error("Errors detected in definition of Lexer:\n" + allErrMessagesString);
            }
            // Only print warning if there are no errors, This will avoid pl
            (0,utils/* forEach */.Ed)(_this.lexerDefinitionWarning, function (warningDescriptor) {
                (0,utils/* PRINT_WARNING */.rr)(warningDescriptor.message);
            });
            _this.TRACE_INIT("Choosing sub-methods implementations", function () {
                // Choose the relevant internal implementations for this specific parser.
                // These implementations should be in-lined by the JavaScript engine
                // to provide optimal performance in each scenario.
                if (SUPPORT_STICKY) {
                    _this.chopInput = utils/* IDENTITY */.Wd;
                    _this.match = _this.matchWithTest;
                }
                else {
                    _this.updateLastIndex = utils/* NOOP */.dG;
                    _this.match = _this.matchWithExec;
                }
                if (hasOnlySingleMode) {
                    _this.handleModes = utils/* NOOP */.dG;
                }
                if (_this.trackStartLines === false) {
                    _this.computeNewColumn = utils/* IDENTITY */.Wd;
                }
                if (_this.trackEndLines === false) {
                    _this.updateTokenEndLineColumnLocation = utils/* NOOP */.dG;
                }
                if (/full/i.test(_this.config.positionTracking)) {
                    _this.createTokenInstance = _this.createFullToken;
                }
                else if (/onlyStart/i.test(_this.config.positionTracking)) {
                    _this.createTokenInstance = _this.createStartOnlyToken;
                }
                else if (/onlyOffset/i.test(_this.config.positionTracking)) {
                    _this.createTokenInstance = _this.createOffsetOnlyToken;
                }
                else {
                    throw Error("Invalid <positionTracking> config option: \"" + _this.config.positionTracking + "\"");
                }
                if (_this.hasCustom) {
                    _this.addToken = _this.addTokenUsingPush;
                    _this.handlePayload = _this.handlePayloadWithCustom;
                }
                else {
                    _this.addToken = _this.addTokenUsingMemberAccess;
                    _this.handlePayload = _this.handlePayloadNoCustom;
                }
            });
            _this.TRACE_INIT("Failed Optimization Warnings", function () {
                var unOptimizedModes = (0,utils/* reduce */.u4)(_this.canModeBeOptimized, function (cannotBeOptimized, canBeOptimized, modeName) {
                    if (canBeOptimized === false) {
                        cannotBeOptimized.push(modeName);
                    }
                    return cannotBeOptimized;
                }, []);
                if (config.ensureOptimizations && !(0,utils/* isEmpty */.xb)(unOptimizedModes)) {
                    throw Error("Lexer Modes: < " + unOptimizedModes.join(", ") + " > cannot be optimized.\n" +
                        '\t Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.\n' +
                        "\t Or inspect the console log for details on how to resolve these issues.");
                }
            });
            _this.TRACE_INIT("clearRegExpParserCache", function () {
                clearRegExpParserCache();
            });
            _this.TRACE_INIT("toFastProperties", function () {
                (0,utils/* toFastProperties */.SV)(_this);
            });
        });
    }
    Lexer.prototype.tokenize = function (text, initialMode) {
        if (initialMode === void 0) { initialMode = this.defaultMode; }
        if (!(0,utils/* isEmpty */.xb)(this.lexerDefinitionErrors)) {
            var allErrMessages = (0,utils/* map */.UI)(this.lexerDefinitionErrors, function (error) {
                return error.message;
            });
            var allErrMessagesString = allErrMessages.join("-----------------------\n");
            throw new Error("Unable to Tokenize because Errors detected in definition of Lexer:\n" +
                allErrMessagesString);
        }
        var lexResult = this.tokenizeInternal(text, initialMode);
        return lexResult;
    };
    // There is quite a bit of duplication between this and "tokenizeInternalLazy"
    // This is intentional due to performance considerations.
    Lexer.prototype.tokenizeInternal = function (text, initialMode) {
        var _this = this;
        var i, j, matchAltImage, longerAltIdx, matchedImage, payload, altPayload, imageLength, group, tokType, newToken, errLength, droppedChar, msg, match;
        var orgText = text;
        var orgLength = orgText.length;
        var offset = 0;
        var matchedTokensIndex = 0;
        // initializing the tokensArray to the "guessed" size.
        // guessing too little will still reduce the number of array re-sizes on pushes.
        // guessing too large (Tested by guessing x4 too large) may cost a bit more of memory
        // but would still have a faster runtime by avoiding (All but one) array resizing.
        var guessedNumberOfTokens = this.hasCustom
            ? 0 // will break custom token pattern APIs the matchedTokens array will contain undefined elements.
            : Math.floor(text.length / 10);
        var matchedTokens = new Array(guessedNumberOfTokens);
        var errors = [];
        var line = this.trackStartLines ? 1 : undefined;
        var column = this.trackStartLines ? 1 : undefined;
        var groups = cloneEmptyGroups(this.emptyGroups);
        var trackLines = this.trackStartLines;
        var lineTerminatorPattern = this.config.lineTerminatorsPattern;
        var currModePatternsLength = 0;
        var patternIdxToConfig = [];
        var currCharCodeToPatternIdxToConfig = [];
        var modeStack = [];
        var emptyArray = [];
        Object.freeze(emptyArray);
        var getPossiblePatterns = undefined;
        function getPossiblePatternsSlow() {
            return patternIdxToConfig;
        }
        function getPossiblePatternsOptimized(charCode) {
            var optimizedCharIdx = charCodeToOptimizedIndex(charCode);
            var possiblePatterns = currCharCodeToPatternIdxToConfig[optimizedCharIdx];
            if (possiblePatterns === undefined) {
                return emptyArray;
            }
            else {
                return possiblePatterns;
            }
        }
        var pop_mode = function (popToken) {
            // TODO: perhaps avoid this error in the edge case there is no more input?
            if (modeStack.length === 1 &&
                // if we have both a POP_MODE and a PUSH_MODE this is in-fact a "transition"
                // So no error should occur.
                popToken.tokenType.PUSH_MODE === undefined) {
                // if we try to pop the last mode there lexer will no longer have ANY mode.
                // thus the pop is ignored, an error will be created and the lexer will continue parsing in the previous mode.
                var msg_1 = _this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(popToken);
                errors.push({
                    offset: popToken.startOffset,
                    line: popToken.startLine !== undefined ? popToken.startLine : undefined,
                    column: popToken.startColumn !== undefined
                        ? popToken.startColumn
                        : undefined,
                    length: popToken.image.length,
                    message: msg_1
                });
            }
            else {
                modeStack.pop();
                var newMode = (0,utils/* last */.Z$)(modeStack);
                patternIdxToConfig = _this.patternIdxToConfig[newMode];
                currCharCodeToPatternIdxToConfig = _this.charCodeToPatternIdxToConfig[newMode];
                currModePatternsLength = patternIdxToConfig.length;
                var modeCanBeOptimized = _this.canModeBeOptimized[newMode] && _this.config.safeMode === false;
                if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) {
                    getPossiblePatterns = getPossiblePatternsOptimized;
                }
                else {
                    getPossiblePatterns = getPossiblePatternsSlow;
                }
            }
        };
        function push_mode(newMode) {
            modeStack.push(newMode);
            currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode];
            patternIdxToConfig = this.patternIdxToConfig[newMode];
            currModePatternsLength = patternIdxToConfig.length;
            currModePatternsLength = patternIdxToConfig.length;
            var modeCanBeOptimized = this.canModeBeOptimized[newMode] && this.config.safeMode === false;
            if (currCharCodeToPatternIdxToConfig && modeCanBeOptimized) {
                getPossiblePatterns = getPossiblePatternsOptimized;
            }
            else {
                getPossiblePatterns = getPossiblePatternsSlow;
            }
        }
        // this pattern seems to avoid a V8 de-optimization, although that de-optimization does not
        // seem to matter performance wise.
        push_mode.call(this, initialMode);
        var currConfig;
        while (offset < orgLength) {
            matchedImage = null;
            var nextCharCode = orgText.charCodeAt(offset);
            var chosenPatternIdxToConfig = getPossiblePatterns(nextCharCode);
            var chosenPatternsLength = chosenPatternIdxToConfig.length;
            for (i = 0; i < chosenPatternsLength; i++) {
                currConfig = chosenPatternIdxToConfig[i];
                var currPattern = currConfig.pattern;
                payload = null;
                // manually in-lined because > 600 chars won't be in-lined in V8
                var singleCharCode = currConfig.short;
                if (singleCharCode !== false) {
                    if (nextCharCode === singleCharCode) {
                        // single character string
                        matchedImage = currPattern;
                    }
                }
                else if (currConfig.isCustom === true) {
                    match = currPattern.exec(orgText, offset, matchedTokens, groups);
                    if (match !== null) {
                        matchedImage = match[0];
                        if (match.payload !== undefined) {
                            payload = match.payload;
                        }
                    }
                    else {
                        matchedImage = null;
                    }
                }
                else {
                    this.updateLastIndex(currPattern, offset);
                    matchedImage = this.match(currPattern, text, offset);
                }
                if (matchedImage !== null) {
                    // even though this pattern matched we must try a another longer alternative.
                    // this can be used to prioritize keywords over identifiers
                    longerAltIdx = currConfig.longerAlt;
                    if (longerAltIdx !== undefined) {
                        // TODO: micro optimize, avoid extra prop access
                        // by saving/linking longerAlt on the original config?
                        var longerAltConfig = patternIdxToConfig[longerAltIdx];
                        var longerAltPattern = longerAltConfig.pattern;
                        altPayload = null;
                        // single Char can never be a longer alt so no need to test it.
                        // manually in-lined because > 600 chars won't be in-lined in V8
                        if (longerAltConfig.isCustom === true) {
                            match = longerAltPattern.exec(orgText, offset, matchedTokens, groups);
                            if (match !== null) {
                                matchAltImage = match[0];
                                if (match.payload !== undefined) {
                                    altPayload = match.payload;
                                }
                            }
                            else {
                                matchAltImage = null;
                            }
                        }
                        else {
                            this.updateLastIndex(longerAltPattern, offset);
                            matchAltImage = this.match(longerAltPattern, text, offset);
                        }
                        if (matchAltImage && matchAltImage.length > matchedImage.length) {
                            matchedImage = matchAltImage;
                            payload = altPayload;
                            currConfig = longerAltConfig;
                        }
                    }
                    break;
                }
            }
            // successful match
            if (matchedImage !== null) {
                imageLength = matchedImage.length;
                group = currConfig.group;
                if (group !== undefined) {
                    tokType = currConfig.tokenTypeIdx;
                    // TODO: "offset + imageLength" and the new column may be computed twice in case of "full" location information inside
                    // createFullToken method
                    newToken = this.createTokenInstance(matchedImage, offset, tokType, currConfig.tokenType, line, column, imageLength);
                    this.handlePayload(newToken, payload);
                    // TODO: optimize NOOP in case there are no special groups?
                    if (group === false) {
                        matchedTokensIndex = this.addToken(matchedTokens, matchedTokensIndex, newToken);
                    }
                    else {
                        groups[group].push(newToken);
                    }
                }
                text = this.chopInput(text, imageLength);
                offset = offset + imageLength;
                // TODO: with newlines the column may be assigned twice
                column = this.computeNewColumn(column, imageLength);
                if (trackLines === true && currConfig.canLineTerminator === true) {
                    var numOfLTsInMatch = 0;
                    var foundTerminator = void 0;
                    var lastLTEndOffset = void 0;
                    lineTerminatorPattern.lastIndex = 0;
                    do {
                        foundTerminator = lineTerminatorPattern.test(matchedImage);
                        if (foundTerminator === true) {
                            lastLTEndOffset = lineTerminatorPattern.lastIndex - 1;
                            numOfLTsInMatch++;
                        }
                    } while (foundTerminator === true);
                    if (numOfLTsInMatch !== 0) {
                        line = line + numOfLTsInMatch;
                        column = imageLength - lastLTEndOffset;
                        this.updateTokenEndLineColumnLocation(newToken, group, lastLTEndOffset, numOfLTsInMatch, line, column, imageLength);
                    }
                }
                // will be NOOP if no modes present
                this.handleModes(currConfig, pop_mode, push_mode, newToken);
            }
            else {
                // error recovery, drop characters until we identify a valid token's start point
                var errorStartOffset = offset;
                var errorLine = line;
                var errorColumn = column;
                var foundResyncPoint = false;
                while (!foundResyncPoint && offset < orgLength) {
                    // drop chars until we succeed in matching something
                    droppedChar = orgText.charCodeAt(offset);
                    // Identity Func (when sticky flag is enabled)
                    text = this.chopInput(text, 1);
                    offset++;
                    for (j = 0; j < currModePatternsLength; j++) {
                        var currConfig_1 = patternIdxToConfig[j];
                        var currPattern = currConfig_1.pattern;
                        // manually in-lined because > 600 chars won't be in-lined in V8
                        var singleCharCode = currConfig_1.short;
                        if (singleCharCode !== false) {
                            if (orgText.charCodeAt(offset) === singleCharCode) {
                                // single character string
                                foundResyncPoint = true;
                            }
                        }
                        else if (currConfig_1.isCustom === true) {
                            foundResyncPoint =
                                currPattern.exec(orgText, offset, matchedTokens, groups) !==
                                    null;
                        }
                        else {
                            this.updateLastIndex(currPattern, offset);
                            foundResyncPoint = currPattern.exec(text) !== null;
                        }
                        if (foundResyncPoint === true) {
                            break;
                        }
                    }
                }
                errLength = offset - errorStartOffset;
                // at this point we either re-synced or reached the end of the input text
                msg = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(orgText, errorStartOffset, errLength, errorLine, errorColumn);
                errors.push({
                    offset: errorStartOffset,
                    line: errorLine,
                    column: errorColumn,
                    length: errLength,
                    message: msg
                });
            }
        }
        // if we do have custom patterns which push directly into the
        // TODO: custom tokens should not push directly??
        if (!this.hasCustom) {
            // if we guessed a too large size for the tokens array this will shrink it to the right size.
            matchedTokens.length = matchedTokensIndex;
        }
        return {
            tokens: matchedTokens,
            groups: groups,
            errors: errors
        };
    };
    Lexer.prototype.handleModes = function (config, pop_mode, push_mode, newToken) {
        if (config.pop === true) {
            // need to save the PUSH_MODE property as if the mode is popped
            // patternIdxToPopMode is updated to reflect the new mode after popping the stack
            var pushMode = config.push;
            pop_mode(newToken);
            if (pushMode !== undefined) {
                push_mode.call(this, pushMode);
            }
        }
        else if (config.push !== undefined) {
            push_mode.call(this, config.push);
        }
    };
    Lexer.prototype.chopInput = function (text, length) {
        return text.substring(length);
    };
    Lexer.prototype.updateLastIndex = function (regExp, newLastIndex) {
        regExp.lastIndex = newLastIndex;
    };
    // TODO: decrease this under 600 characters? inspect stripping comments option in TSC compiler
    Lexer.prototype.updateTokenEndLineColumnLocation = function (newToken, group, lastLTIdx, numOfLTsInMatch, line, column, imageLength) {
        var lastCharIsLT, fixForEndingInLT;
        if (group !== undefined) {
            // a none skipped multi line Token, need to update endLine/endColumn
            lastCharIsLT = lastLTIdx === imageLength - 1;
            fixForEndingInLT = lastCharIsLT ? -1 : 0;
            if (!(numOfLTsInMatch === 1 && lastCharIsLT === true)) {
                // if a token ends in a LT that last LT only affects the line numbering of following Tokens
                newToken.endLine = line + fixForEndingInLT;
                // the last LT in a token does not affect the endColumn either as the [columnStart ... columnEnd)
                // inclusive to exclusive range.
                newToken.endColumn = column - 1 + -fixForEndingInLT;
            }
            // else single LT in the last character of a token, no need to modify the endLine/EndColumn
        }
    };
    Lexer.prototype.computeNewColumn = function (oldColumn, imageLength) {
        return oldColumn + imageLength;
    };
    // Place holder, will be replaced by the correct variant according to the locationTracking option at runtime.
    /* istanbul ignore next - place holder */
    Lexer.prototype.createTokenInstance = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return null;
    };
    Lexer.prototype.createOffsetOnlyToken = function (image, startOffset, tokenTypeIdx, tokenType) {
        return {
            image: image,
            startOffset: startOffset,
            tokenTypeIdx: tokenTypeIdx,
            tokenType: tokenType
        };
    };
    Lexer.prototype.createStartOnlyToken = function (image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn) {
        return {
            image: image,
            startOffset: startOffset,
            startLine: startLine,
            startColumn: startColumn,
            tokenTypeIdx: tokenTypeIdx,
            tokenType: tokenType
        };
    };
    Lexer.prototype.createFullToken = function (image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn, imageLength) {
        return {
            image: image,
            startOffset: startOffset,
            endOffset: startOffset + imageLength - 1,
            startLine: startLine,
            endLine: startLine,
            startColumn: startColumn,
            endColumn: startColumn + imageLength - 1,
            tokenTypeIdx: tokenTypeIdx,
            tokenType: tokenType
        };
    };
    // Place holder, will be replaced by the correct variant according to the locationTracking option at runtime.
    /* istanbul ignore next - place holder */
    Lexer.prototype.addToken = function (tokenVector, index, tokenToAdd) {
        return 666;
    };
    Lexer.prototype.addTokenUsingPush = function (tokenVector, index, tokenToAdd) {
        tokenVector.push(tokenToAdd);
        return index;
    };
    Lexer.prototype.addTokenUsingMemberAccess = function (tokenVector, index, tokenToAdd) {
        tokenVector[index] = tokenToAdd;
        index++;
        return index;
    };
    // Place holder, will be replaced by the correct variant according to the hasCustom flag option at runtime.
    /* istanbul ignore next - place holder */
    Lexer.prototype.handlePayload = function (token, payload) { };
    Lexer.prototype.handlePayloadNoCustom = function (token, payload) { };
    Lexer.prototype.handlePayloadWithCustom = function (token, payload) {
        if (payload !== null) {
            token.payload = payload;
        }
    };
    /* istanbul ignore next - place holder to be replaced with chosen alternative at runtime */
    Lexer.prototype.match = function (pattern, text, offset) {
        return null;
    };
    Lexer.prototype.matchWithTest = function (pattern, text, offset) {
        var found = pattern.test(text);
        if (found === true) {
            return text.substring(offset, pattern.lastIndex);
        }
        return null;
    };
    Lexer.prototype.matchWithExec = function (pattern, text) {
        var regExpArray = pattern.exec(text);
        return regExpArray !== null ? regExpArray[0] : regExpArray;
    };
    // Duplicated from the parser's perf trace trait to allow future extraction
    // of the lexer to a separate package.
    Lexer.prototype.TRACE_INIT = function (phaseDesc, phaseImpl) {
        // No need to optimize this using NOOP pattern because
        // It is not called in a hot spot...
        if (this.traceInitPerf === true) {
            this.traceInitIndent++;
            var indent = new Array(this.traceInitIndent + 1).join("\t");
            if (this.traceInitIndent < this.traceInitMaxIdent) {
                console.log(indent + "--> <" + phaseDesc + ">");
            }
            var _a = (0,utils/* timer */.HT)(phaseImpl), time = _a.time, value = _a.value;
            /* istanbul ignore next - Difficult to reproduce specific performance behavior (>10ms) in tests */
            var traceMethod = time > 10 ? console.warn : console.log;
            if (this.traceInitIndent < this.traceInitMaxIdent) {
                traceMethod(indent + "<-- <" + phaseDesc + "> time: " + time + "ms");
            }
            this.traceInitIndent--;
            return value;
        }
        else {
            return phaseImpl();
        }
    };
    Lexer.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it will" +
        "be consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
    Lexer.NA = /NOT_APPLICABLE/;
    return Lexer;
}());

//# sourceMappingURL=lexer_public.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/scan/tokens_public.js



function tokenLabel(tokType) {
    if (hasTokenLabel(tokType)) {
        return tokType.LABEL;
    }
    else {
        return tokType.name;
    }
}
function tokenName(tokType) {
    return tokType.name;
}
function hasTokenLabel(obj) {
    return (0,utils/* isString */.HD)(obj.LABEL) && obj.LABEL !== "";
}
var PARENT = "parent";
var CATEGORIES = "categories";
var LABEL = "label";
var GROUP = "group";
var PUSH_MODE = "push_mode";
var POP_MODE = "pop_mode";
var LONGER_ALT = "longer_alt";
var LINE_BREAKS = "line_breaks";
var START_CHARS_HINT = "start_chars_hint";
function createToken(config) {
    return createTokenInternal(config);
}
function createTokenInternal(config) {
    var pattern = config.pattern;
    var tokenType = {};
    tokenType.name = config.name;
    if (!(0,utils/* isUndefined */.o8)(pattern)) {
        tokenType.PATTERN = pattern;
    }
    if ((0,utils/* has */.e$)(config, PARENT)) {
        throw ("The parent property is no longer supported.\n" +
            "See: https://github.com/SAP/chevrotain/issues/564#issuecomment-349062346 for details.");
    }
    if ((0,utils/* has */.e$)(config, CATEGORIES)) {
        // casting to ANY as this will be fixed inside `augmentTokenTypes``
        tokenType.CATEGORIES = config[CATEGORIES];
    }
    augmentTokenTypes([tokenType]);
    if ((0,utils/* has */.e$)(config, LABEL)) {
        tokenType.LABEL = config[LABEL];
    }
    if ((0,utils/* has */.e$)(config, GROUP)) {
        tokenType.GROUP = config[GROUP];
    }
    if ((0,utils/* has */.e$)(config, POP_MODE)) {
        tokenType.POP_MODE = config[POP_MODE];
    }
    if ((0,utils/* has */.e$)(config, PUSH_MODE)) {
        tokenType.PUSH_MODE = config[PUSH_MODE];
    }
    if ((0,utils/* has */.e$)(config, LONGER_ALT)) {
        tokenType.LONGER_ALT = config[LONGER_ALT];
    }
    if ((0,utils/* has */.e$)(config, LINE_BREAKS)) {
        tokenType.LINE_BREAKS = config[LINE_BREAKS];
    }
    if ((0,utils/* has */.e$)(config, START_CHARS_HINT)) {
        tokenType.START_CHARS_HINT = config[START_CHARS_HINT];
    }
    return tokenType;
}
var EOF = createToken({ name: "EOF", pattern: Lexer.NA });
augmentTokenTypes([EOF]);
function createTokenInstance(tokType, image, startOffset, endOffset, startLine, endLine, startColumn, endColumn) {
    return {
        image: image,
        startOffset: startOffset,
        endOffset: endOffset,
        startLine: startLine,
        endLine: endLine,
        startColumn: startColumn,
        endColumn: endColumn,
        tokenTypeIdx: tokType.tokenTypeIdx,
        tokenType: tokType
    };
}
function tokenMatcher(token, tokType) {
    return tokenStructuredMatcher(token, tokType);
}
//# sourceMappingURL=tokens_public.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/grammar/gast/gast_public.js
var gast_public_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var AbstractProduction = /** @class */ (function () {
    function AbstractProduction(_definition) {
        this._definition = _definition;
    }
    Object.defineProperty(AbstractProduction.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        set: function (value) {
            this._definition = value;
        },
        enumerable: false,
        configurable: true
    });
    AbstractProduction.prototype.accept = function (visitor) {
        visitor.visit(this);
        (0,utils/* forEach */.Ed)(this.definition, function (prod) {
            prod.accept(visitor);
        });
    };
    return AbstractProduction;
}());

var NonTerminal = /** @class */ (function (_super) {
    gast_public_extends(NonTerminal, _super);
    function NonTerminal(options) {
        var _this = _super.call(this, []) || this;
        _this.idx = 1;
        (0,utils/* assign */.f0)(_this, (0,utils/* pick */.ei)(options, function (v) { return v !== undefined; }));
        return _this;
    }
    Object.defineProperty(NonTerminal.prototype, "definition", {
        get: function () {
            if (this.referencedRule !== undefined) {
                return this.referencedRule.definition;
            }
            return [];
        },
        set: function (definition) {
            // immutable
        },
        enumerable: false,
        configurable: true
    });
    NonTerminal.prototype.accept = function (visitor) {
        visitor.visit(this);
        // don't visit children of a reference, we will get cyclic infinite loops if we do so
    };
    return NonTerminal;
}(AbstractProduction));

var Rule = /** @class */ (function (_super) {
    gast_public_extends(Rule, _super);
    function Rule(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.orgText = "";
        (0,utils/* assign */.f0)(_this, (0,utils/* pick */.ei)(options, function (v) { return v !== undefined; }));
        return _this;
    }
    return Rule;
}(AbstractProduction));

var Alternative = /** @class */ (function (_super) {
    gast_public_extends(Alternative, _super);
    function Alternative(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.ignoreAmbiguities = false;
        (0,utils/* assign */.f0)(_this, (0,utils/* pick */.ei)(options, function (v) { return v !== undefined; }));
        return _this;
    }
    return Alternative;
}(AbstractProduction));

var Option = /** @class */ (function (_super) {
    gast_public_extends(Option, _super);
    function Option(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        (0,utils/* assign */.f0)(_this, (0,utils/* pick */.ei)(options, function (v) { return v !== undefined; }));
        return _this;
    }
    return Option;
}(AbstractProduction));

var RepetitionMandatory = /** @class */ (function (_super) {
    gast_public_extends(RepetitionMandatory, _super);
    function RepetitionMandatory(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        (0,utils/* assign */.f0)(_this, (0,utils/* pick */.ei)(options, function (v) { return v !== undefined; }));
        return _this;
    }
    return RepetitionMandatory;
}(AbstractProduction));

var RepetitionMandatoryWithSeparator = /** @class */ (function (_super) {
    gast_public_extends(RepetitionMandatoryWithSeparator, _super);
    function RepetitionMandatoryWithSeparator(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        (0,utils/* assign */.f0)(_this, (0,utils/* pick */.ei)(options, function (v) { return v !== undefined; }));
        return _this;
    }
    return RepetitionMandatoryWithSeparator;
}(AbstractProduction));

var Repetition = /** @class */ (function (_super) {
    gast_public_extends(Repetition, _super);
    function Repetition(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        (0,utils/* assign */.f0)(_this, (0,utils/* pick */.ei)(options, function (v) { return v !== undefined; }));
        return _this;
    }
    return Repetition;
}(AbstractProduction));

var RepetitionWithSeparator = /** @class */ (function (_super) {
    gast_public_extends(RepetitionWithSeparator, _super);
    function RepetitionWithSeparator(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        (0,utils/* assign */.f0)(_this, (0,utils/* pick */.ei)(options, function (v) { return v !== undefined; }));
        return _this;
    }
    return RepetitionWithSeparator;
}(AbstractProduction));

var Alternation = /** @class */ (function (_super) {
    gast_public_extends(Alternation, _super);
    function Alternation(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        _this.ignoreAmbiguities = false;
        _this.hasPredicates = false;
        (0,utils/* assign */.f0)(_this, (0,utils/* pick */.ei)(options, function (v) { return v !== undefined; }));
        return _this;
    }
    Object.defineProperty(Alternation.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        set: function (value) {
            this._definition = value;
        },
        enumerable: false,
        configurable: true
    });
    return Alternation;
}(AbstractProduction));

var Terminal = /** @class */ (function () {
    function Terminal(options) {
        this.idx = 1;
        (0,utils/* assign */.f0)(this, (0,utils/* pick */.ei)(options, function (v) { return v !== undefined; }));
    }
    Terminal.prototype.accept = function (visitor) {
        visitor.visit(this);
    };
    return Terminal;
}());

function serializeGrammar(topRules) {
    return (0,utils/* map */.UI)(topRules, serializeProduction);
}
function serializeProduction(node) {
    function convertDefinition(definition) {
        return (0,utils/* map */.UI)(definition, serializeProduction);
    }
    /* istanbul ignore else */
    if (node instanceof NonTerminal) {
        return {
            type: "NonTerminal",
            name: node.nonTerminalName,
            idx: node.idx
        };
    }
    else if (node instanceof Alternative) {
        return {
            type: "Alternative",
            definition: convertDefinition(node.definition)
        };
    }
    else if (node instanceof Option) {
        return {
            type: "Option",
            idx: node.idx,
            definition: convertDefinition(node.definition)
        };
    }
    else if (node instanceof RepetitionMandatory) {
        return {
            type: "RepetitionMandatory",
            idx: node.idx,
            definition: convertDefinition(node.definition)
        };
    }
    else if (node instanceof RepetitionMandatoryWithSeparator) {
        return {
            type: "RepetitionMandatoryWithSeparator",
            idx: node.idx,
            separator: (serializeProduction(new Terminal({ terminalType: node.separator }))),
            definition: convertDefinition(node.definition)
        };
    }
    else if (node instanceof RepetitionWithSeparator) {
        return {
            type: "RepetitionWithSeparator",
            idx: node.idx,
            separator: (serializeProduction(new Terminal({ terminalType: node.separator }))),
            definition: convertDefinition(node.definition)
        };
    }
    else if (node instanceof Repetition) {
        return {
            type: "Repetition",
            idx: node.idx,
            definition: convertDefinition(node.definition)
        };
    }
    else if (node instanceof Alternation) {
        return {
            type: "Alternation",
            idx: node.idx,
            definition: convertDefinition(node.definition)
        };
    }
    else if (node instanceof Terminal) {
        var serializedTerminal = {
            type: "Terminal",
            name: node.terminalType.name,
            label: tokenLabel(node.terminalType),
            idx: node.idx
        };
        var pattern = node.terminalType.PATTERN;
        if (node.terminalType.PATTERN) {
            serializedTerminal.pattern = (0,utils/* isRegExp */.Kj)(pattern)
                ? pattern.source
                : pattern;
        }
        return serializedTerminal;
    }
    else if (node instanceof Rule) {
        return {
            type: "Rule",
            name: node.name,
            orgText: node.orgText,
            definition: convertDefinition(node.definition)
        };
    }
    else {
        throw Error("non exhaustive match");
    }
}
//# sourceMappingURL=gast_public.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/grammar/rest.js


/**
 *  A Grammar Walker that computes the "remaining" grammar "after" a productions in the grammar.
 */
var RestWalker = /** @class */ (function () {
    function RestWalker() {
    }
    RestWalker.prototype.walk = function (prod, prevRest) {
        var _this = this;
        if (prevRest === void 0) { prevRest = []; }
        (0,utils/* forEach */.Ed)(prod.definition, function (subProd, index) {
            var currRest = (0,utils/* drop */.Cw)(prod.definition, index + 1);
            /* istanbul ignore else */
            if (subProd instanceof NonTerminal) {
                _this.walkProdRef(subProd, currRest, prevRest);
            }
            else if (subProd instanceof Terminal) {
                _this.walkTerminal(subProd, currRest, prevRest);
            }
            else if (subProd instanceof Alternative) {
                _this.walkFlat(subProd, currRest, prevRest);
            }
            else if (subProd instanceof Option) {
                _this.walkOption(subProd, currRest, prevRest);
            }
            else if (subProd instanceof RepetitionMandatory) {
                _this.walkAtLeastOne(subProd, currRest, prevRest);
            }
            else if (subProd instanceof RepetitionMandatoryWithSeparator) {
                _this.walkAtLeastOneSep(subProd, currRest, prevRest);
            }
            else if (subProd instanceof RepetitionWithSeparator) {
                _this.walkManySep(subProd, currRest, prevRest);
            }
            else if (subProd instanceof Repetition) {
                _this.walkMany(subProd, currRest, prevRest);
            }
            else if (subProd instanceof Alternation) {
                _this.walkOr(subProd, currRest, prevRest);
            }
            else {
                throw Error("non exhaustive match");
            }
        });
    };
    RestWalker.prototype.walkTerminal = function (terminal, currRest, prevRest) { };
    RestWalker.prototype.walkProdRef = function (refProd, currRest, prevRest) { };
    RestWalker.prototype.walkFlat = function (flatProd, currRest, prevRest) {
        // ABCDEF => after the D the rest is EF
        var fullOrRest = currRest.concat(prevRest);
        this.walk(flatProd, fullOrRest);
    };
    RestWalker.prototype.walkOption = function (optionProd, currRest, prevRest) {
        // ABC(DE)?F => after the (DE)? the rest is F
        var fullOrRest = currRest.concat(prevRest);
        this.walk(optionProd, fullOrRest);
    };
    RestWalker.prototype.walkAtLeastOne = function (atLeastOneProd, currRest, prevRest) {
        // ABC(DE)+F => after the (DE)+ the rest is (DE)?F
        var fullAtLeastOneRest = [
            new Option({ definition: atLeastOneProd.definition })
        ].concat(currRest, prevRest);
        this.walk(atLeastOneProd, fullAtLeastOneRest);
    };
    RestWalker.prototype.walkAtLeastOneSep = function (atLeastOneSepProd, currRest, prevRest) {
        // ABC DE(,DE)* F => after the (,DE)+ the rest is (,DE)?F
        var fullAtLeastOneSepRest = restForRepetitionWithSeparator(atLeastOneSepProd, currRest, prevRest);
        this.walk(atLeastOneSepProd, fullAtLeastOneSepRest);
    };
    RestWalker.prototype.walkMany = function (manyProd, currRest, prevRest) {
        // ABC(DE)*F => after the (DE)* the rest is (DE)?F
        var fullManyRest = [
            new Option({ definition: manyProd.definition })
        ].concat(currRest, prevRest);
        this.walk(manyProd, fullManyRest);
    };
    RestWalker.prototype.walkManySep = function (manySepProd, currRest, prevRest) {
        // ABC (DE(,DE)*)? F => after the (,DE)* the rest is (,DE)?F
        var fullManySepRest = restForRepetitionWithSeparator(manySepProd, currRest, prevRest);
        this.walk(manySepProd, fullManySepRest);
    };
    RestWalker.prototype.walkOr = function (orProd, currRest, prevRest) {
        var _this = this;
        // ABC(D|E|F)G => when finding the (D|E|F) the rest is G
        var fullOrRest = currRest.concat(prevRest);
        // walk all different alternatives
        (0,utils/* forEach */.Ed)(orProd.definition, function (alt) {
            // wrapping each alternative in a single definition wrapper
            // to avoid errors in computing the rest of that alternative in the invocation to computeInProdFollows
            // (otherwise for OR([alt1,alt2]) alt2 will be considered in 'rest' of alt1
            var prodWrapper = new Alternative({ definition: [alt] });
            _this.walk(prodWrapper, fullOrRest);
        });
    };
    return RestWalker;
}());

function restForRepetitionWithSeparator(repSepProd, currRest, prevRest) {
    var repSepRest = [
        new Option({
            definition: [new Terminal({ terminalType: repSepProd.separator })].concat(repSepProd.definition)
        })
    ];
    var fullRepSepRest = repSepRest.concat(currRest, prevRest);
    return fullRepSepRest;
}
//# sourceMappingURL=rest.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/grammar/gast/gast_visitor_public.js

var GAstVisitor = /** @class */ (function () {
    function GAstVisitor() {
    }
    GAstVisitor.prototype.visit = function (node) {
        var nodeAny = node;
        switch (nodeAny.constructor) {
            case NonTerminal:
                return this.visitNonTerminal(nodeAny);
            case Alternative:
                return this.visitAlternative(nodeAny);
            case Option:
                return this.visitOption(nodeAny);
            case RepetitionMandatory:
                return this.visitRepetitionMandatory(nodeAny);
            case RepetitionMandatoryWithSeparator:
                return this.visitRepetitionMandatoryWithSeparator(nodeAny);
            case RepetitionWithSeparator:
                return this.visitRepetitionWithSeparator(nodeAny);
            case Repetition:
                return this.visitRepetition(nodeAny);
            case Alternation:
                return this.visitAlternation(nodeAny);
            case Terminal:
                return this.visitTerminal(nodeAny);
            case Rule:
                return this.visitRule(nodeAny);
            /* istanbul ignore next */
            default:
                throw Error("non exhaustive match");
        }
    };
    GAstVisitor.prototype.visitNonTerminal = function (node) { };
    GAstVisitor.prototype.visitAlternative = function (node) { };
    GAstVisitor.prototype.visitOption = function (node) { };
    GAstVisitor.prototype.visitRepetition = function (node) { };
    GAstVisitor.prototype.visitRepetitionMandatory = function (node) { };
    GAstVisitor.prototype.visitRepetitionMandatoryWithSeparator = function (node) { };
    GAstVisitor.prototype.visitRepetitionWithSeparator = function (node) { };
    GAstVisitor.prototype.visitAlternation = function (node) { };
    GAstVisitor.prototype.visitTerminal = function (node) { };
    GAstVisitor.prototype.visitRule = function (node) { };
    return GAstVisitor;
}());

//# sourceMappingURL=gast_visitor_public.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/grammar/gast/gast.js
var gast_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



function isSequenceProd(prod) {
    return (prod instanceof Alternative ||
        prod instanceof Option ||
        prod instanceof Repetition ||
        prod instanceof RepetitionMandatory ||
        prod instanceof RepetitionMandatoryWithSeparator ||
        prod instanceof RepetitionWithSeparator ||
        prod instanceof Terminal ||
        prod instanceof Rule);
}
function isOptionalProd(prod, alreadyVisited) {
    if (alreadyVisited === void 0) { alreadyVisited = []; }
    var isDirectlyOptional = prod instanceof Option ||
        prod instanceof Repetition ||
        prod instanceof RepetitionWithSeparator;
    if (isDirectlyOptional) {
        return true;
    }
    // note that this can cause infinite loop if one optional empty TOP production has a cyclic dependency with another
    // empty optional top rule
    // may be indirectly optional ((A?B?C?) | (D?E?F?))
    if (prod instanceof Alternation) {
        // for OR its enough for just one of the alternatives to be optional
        return (0,utils/* some */.G)(prod.definition, function (subProd) {
            return isOptionalProd(subProd, alreadyVisited);
        });
    }
    else if (prod instanceof NonTerminal && (0,utils/* contains */.r3)(alreadyVisited, prod)) {
        // avoiding stack overflow due to infinite recursion
        return false;
    }
    else if (prod instanceof AbstractProduction) {
        if (prod instanceof NonTerminal) {
            alreadyVisited.push(prod);
        }
        return (0,utils/* every */.yW)(prod.definition, function (subProd) {
            return isOptionalProd(subProd, alreadyVisited);
        });
    }
    else {
        return false;
    }
}
function isBranchingProd(prod) {
    return prod instanceof Alternation;
}
function getProductionDslName(prod) {
    /* istanbul ignore else */
    if (prod instanceof NonTerminal) {
        return "SUBRULE";
    }
    else if (prod instanceof Option) {
        return "OPTION";
    }
    else if (prod instanceof Alternation) {
        return "OR";
    }
    else if (prod instanceof RepetitionMandatory) {
        return "AT_LEAST_ONE";
    }
    else if (prod instanceof RepetitionMandatoryWithSeparator) {
        return "AT_LEAST_ONE_SEP";
    }
    else if (prod instanceof RepetitionWithSeparator) {
        return "MANY_SEP";
    }
    else if (prod instanceof Repetition) {
        return "MANY";
    }
    else if (prod instanceof Terminal) {
        return "CONSUME";
    }
    else {
        throw Error("non exhaustive match");
    }
}
var DslMethodsCollectorVisitor = /** @class */ (function (_super) {
    gast_extends(DslMethodsCollectorVisitor, _super);
    function DslMethodsCollectorVisitor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // A minus is never valid in an identifier name
        _this.separator = "-";
        _this.dslMethods = {
            option: [],
            alternation: [],
            repetition: [],
            repetitionWithSeparator: [],
            repetitionMandatory: [],
            repetitionMandatoryWithSeparator: []
        };
        return _this;
    }
    DslMethodsCollectorVisitor.prototype.reset = function () {
        this.dslMethods = {
            option: [],
            alternation: [],
            repetition: [],
            repetitionWithSeparator: [],
            repetitionMandatory: [],
            repetitionMandatoryWithSeparator: []
        };
    };
    DslMethodsCollectorVisitor.prototype.visitTerminal = function (terminal) {
        var key = terminal.terminalType.name + this.separator + "Terminal";
        if (!(0,utils/* has */.e$)(this.dslMethods, key)) {
            this.dslMethods[key] = [];
        }
        this.dslMethods[key].push(terminal);
    };
    DslMethodsCollectorVisitor.prototype.visitNonTerminal = function (subrule) {
        var key = subrule.nonTerminalName + this.separator + "Terminal";
        if (!(0,utils/* has */.e$)(this.dslMethods, key)) {
            this.dslMethods[key] = [];
        }
        this.dslMethods[key].push(subrule);
    };
    DslMethodsCollectorVisitor.prototype.visitOption = function (option) {
        this.dslMethods.option.push(option);
    };
    DslMethodsCollectorVisitor.prototype.visitRepetitionWithSeparator = function (manySep) {
        this.dslMethods.repetitionWithSeparator.push(manySep);
    };
    DslMethodsCollectorVisitor.prototype.visitRepetitionMandatory = function (atLeastOne) {
        this.dslMethods.repetitionMandatory.push(atLeastOne);
    };
    DslMethodsCollectorVisitor.prototype.visitRepetitionMandatoryWithSeparator = function (atLeastOneSep) {
        this.dslMethods.repetitionMandatoryWithSeparator.push(atLeastOneSep);
    };
    DslMethodsCollectorVisitor.prototype.visitRepetition = function (many) {
        this.dslMethods.repetition.push(many);
    };
    DslMethodsCollectorVisitor.prototype.visitAlternation = function (or) {
        this.dslMethods.alternation.push(or);
    };
    return DslMethodsCollectorVisitor;
}(GAstVisitor));

var collectorVisitor = new DslMethodsCollectorVisitor();
function collectMethods(rule) {
    collectorVisitor.reset();
    rule.accept(collectorVisitor);
    var dslMethods = collectorVisitor.dslMethods;
    // avoid uncleaned references
    collectorVisitor.reset();
    return dslMethods;
}
//# sourceMappingURL=gast.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/grammar/first.js



function first(prod) {
    /* istanbul ignore else */
    if (prod instanceof NonTerminal) {
        // this could in theory cause infinite loops if
        // (1) prod A refs prod B.
        // (2) prod B refs prod A
        // (3) AB can match the empty set
        // in other words a cycle where everything is optional so the first will keep
        // looking ahead for the next optional part and will never exit
        // currently there is no safeguard for this unique edge case because
        // (1) not sure a grammar in which this can happen is useful for anything (productive)
        return first(prod.referencedRule);
    }
    else if (prod instanceof Terminal) {
        return firstForTerminal(prod);
    }
    else if (isSequenceProd(prod)) {
        return firstForSequence(prod);
    }
    else if (isBranchingProd(prod)) {
        return firstForBranching(prod);
    }
    else {
        throw Error("non exhaustive match");
    }
}
function firstForSequence(prod) {
    var firstSet = [];
    var seq = prod.definition;
    var nextSubProdIdx = 0;
    var hasInnerProdsRemaining = seq.length > nextSubProdIdx;
    var currSubProd;
    // so we enter the loop at least once (if the definition is not empty
    var isLastInnerProdOptional = true;
    // scan a sequence until it's end or until we have found a NONE optional production in it
    while (hasInnerProdsRemaining && isLastInnerProdOptional) {
        currSubProd = seq[nextSubProdIdx];
        isLastInnerProdOptional = isOptionalProd(currSubProd);
        firstSet = firstSet.concat(first(currSubProd));
        nextSubProdIdx = nextSubProdIdx + 1;
        hasInnerProdsRemaining = seq.length > nextSubProdIdx;
    }
    return (0,utils/* uniq */.jj)(firstSet);
}
function firstForBranching(prod) {
    var allAlternativesFirsts = (0,utils/* map */.UI)(prod.definition, function (innerProd) {
        return first(innerProd);
    });
    return (0,utils/* uniq */.jj)((0,utils/* flatten */.xH)(allAlternativesFirsts));
}
function firstForTerminal(terminal) {
    return [terminal.terminalType];
}
//# sourceMappingURL=first.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/constants.js
// TODO: can this be removed? where is it used?
var constants_IN = "_~IN~_";
//# sourceMappingURL=constants.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/grammar/follow.js
var follow_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





// This ResyncFollowsWalker computes all of the follows required for RESYNC
// (skipping reference production).
var ResyncFollowsWalker = /** @class */ (function (_super) {
    follow_extends(ResyncFollowsWalker, _super);
    function ResyncFollowsWalker(topProd) {
        var _this = _super.call(this) || this;
        _this.topProd = topProd;
        _this.follows = {};
        return _this;
    }
    ResyncFollowsWalker.prototype.startWalking = function () {
        this.walk(this.topProd);
        return this.follows;
    };
    ResyncFollowsWalker.prototype.walkTerminal = function (terminal, currRest, prevRest) {
        // do nothing! just like in the public sector after 13:00
    };
    ResyncFollowsWalker.prototype.walkProdRef = function (refProd, currRest, prevRest) {
        var followName = buildBetweenProdsFollowPrefix(refProd.referencedRule, refProd.idx) +
            this.topProd.name;
        var fullRest = currRest.concat(prevRest);
        var restProd = new Alternative({ definition: fullRest });
        var t_in_topProd_follows = first(restProd);
        this.follows[followName] = t_in_topProd_follows;
    };
    return ResyncFollowsWalker;
}(RestWalker));

function computeAllProdsFollows(topProductions) {
    var reSyncFollows = {};
    (0,utils/* forEach */.Ed)(topProductions, function (topProd) {
        var currRefsFollow = new ResyncFollowsWalker(topProd).startWalking();
        (0,utils/* assign */.f0)(reSyncFollows, currRefsFollow);
    });
    return reSyncFollows;
}
function buildBetweenProdsFollowPrefix(inner, occurenceInParent) {
    return inner.name + occurenceInParent + constants_IN;
}
function buildInProdFollowPrefix(terminal) {
    var terminalName = terminal.terminalType.name;
    return terminalName + terminal.idx + IN;
}
//# sourceMappingURL=follow.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/errors_public.js





var defaultParserErrorProvider = {
    buildMismatchTokenMessage: function (_a) {
        var expected = _a.expected, actual = _a.actual, previous = _a.previous, ruleName = _a.ruleName;
        var hasLabel = hasTokenLabel(expected);
        var expectedMsg = hasLabel
            ? "--> " + tokenLabel(expected) + " <--"
            : "token of type --> " + expected.name + " <--";
        var msg = "Expecting " + expectedMsg + " but found --> '" + actual.image + "' <--";
        return msg;
    },
    buildNotAllInputParsedMessage: function (_a) {
        var firstRedundant = _a.firstRedundant, ruleName = _a.ruleName;
        return "Redundant input, expecting EOF but found: " + firstRedundant.image;
    },
    buildNoViableAltMessage: function (_a) {
        var expectedPathsPerAlt = _a.expectedPathsPerAlt, actual = _a.actual, previous = _a.previous, customUserDescription = _a.customUserDescription, ruleName = _a.ruleName;
        var errPrefix = "Expecting: ";
        // TODO: issue: No Viable Alternative Error may have incomplete details. #502
        var actualText = (0,utils/* first */.Ps)(actual).image;
        var errSuffix = "\nbut found: '" + actualText + "'";
        if (customUserDescription) {
            return errPrefix + customUserDescription + errSuffix;
        }
        else {
            var allLookAheadPaths = (0,utils/* reduce */.u4)(expectedPathsPerAlt, function (result, currAltPaths) { return result.concat(currAltPaths); }, []);
            var nextValidTokenSequences = (0,utils/* map */.UI)(allLookAheadPaths, function (currPath) {
                return "[" + (0,utils/* map */.UI)(currPath, function (currTokenType) { return tokenLabel(currTokenType); }).join(", ") + "]";
            });
            var nextValidSequenceItems = (0,utils/* map */.UI)(nextValidTokenSequences, function (itemMsg, idx) { return "  " + (idx + 1) + ". " + itemMsg; });
            var calculatedDescription = "one of these possible Token sequences:\n" + nextValidSequenceItems.join("\n");
            return errPrefix + calculatedDescription + errSuffix;
        }
    },
    buildEarlyExitMessage: function (_a) {
        var expectedIterationPaths = _a.expectedIterationPaths, actual = _a.actual, customUserDescription = _a.customUserDescription, ruleName = _a.ruleName;
        var errPrefix = "Expecting: ";
        // TODO: issue: No Viable Alternative Error may have incomplete details. #502
        var actualText = (0,utils/* first */.Ps)(actual).image;
        var errSuffix = "\nbut found: '" + actualText + "'";
        if (customUserDescription) {
            return errPrefix + customUserDescription + errSuffix;
        }
        else {
            var nextValidTokenSequences = (0,utils/* map */.UI)(expectedIterationPaths, function (currPath) {
                return "[" + (0,utils/* map */.UI)(currPath, function (currTokenType) { return tokenLabel(currTokenType); }).join(",") + "]";
            });
            var calculatedDescription = "expecting at least one iteration which starts with one of these possible Token sequences::\n  " +
                ("<" + nextValidTokenSequences.join(" ,") + ">");
            return errPrefix + calculatedDescription + errSuffix;
        }
    }
};
Object.freeze(defaultParserErrorProvider);
var defaultGrammarResolverErrorProvider = {
    buildRuleNotFoundError: function (topLevelRule, undefinedRule) {
        var msg = "Invalid grammar, reference to a rule which is not defined: ->" +
            undefinedRule.nonTerminalName +
            "<-\n" +
            "inside top level rule: ->" +
            topLevelRule.name +
            "<-";
        return msg;
    }
};
var defaultGrammarValidatorErrorProvider = {
    buildDuplicateFoundError: function (topLevelRule, duplicateProds) {
        function getExtraProductionArgument(prod) {
            if (prod instanceof Terminal) {
                return prod.terminalType.name;
            }
            else if (prod instanceof NonTerminal) {
                return prod.nonTerminalName;
            }
            else {
                return "";
            }
        }
        var topLevelName = topLevelRule.name;
        var duplicateProd = (0,utils/* first */.Ps)(duplicateProds);
        var index = duplicateProd.idx;
        var dslName = getProductionDslName(duplicateProd);
        var extraArgument = getExtraProductionArgument(duplicateProd);
        var hasExplicitIndex = index > 0;
        var msg = "->" + dslName + (hasExplicitIndex ? index : "") + "<- " + (extraArgument ? "with argument: ->" + extraArgument + "<-" : "") + "\n                  appears more than once (" + duplicateProds.length + " times) in the top level rule: ->" + topLevelName + "<-.                  \n                  For further details see: https://sap.github.io/chevrotain/docs/FAQ.html#NUMERICAL_SUFFIXES \n                  ";
        // white space trimming time! better to trim afterwards as it allows to use WELL formatted multi line template strings...
        msg = msg.replace(/[ \t]+/g, " ");
        msg = msg.replace(/\s\s+/g, "\n");
        return msg;
    },
    buildNamespaceConflictError: function (rule) {
        var errMsg = "Namespace conflict found in grammar.\n" +
            ("The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <" + rule.name + ">.\n") +
            "To resolve this make sure each Terminal and Non-Terminal names are unique\n" +
            "This is easy to accomplish by using the convention that Terminal names start with an uppercase letter\n" +
            "and Non-Terminal names start with a lower case letter.";
        return errMsg;
    },
    buildAlternationPrefixAmbiguityError: function (options) {
        var pathMsg = (0,utils/* map */.UI)(options.prefixPath, function (currTok) {
            return tokenLabel(currTok);
        }).join(", ");
        var occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
        var errMsg = "Ambiguous alternatives: <" + options.ambiguityIndices.join(" ,") + "> due to common lookahead prefix\n" +
            ("in <OR" + occurrence + "> inside <" + options.topLevelRule.name + "> Rule,\n") +
            ("<" + pathMsg + "> may appears as a prefix path in all these alternatives.\n") +
            "See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX\n" +
            "For Further details.";
        return errMsg;
    },
    buildAlternationAmbiguityError: function (options) {
        var pathMsg = (0,utils/* map */.UI)(options.prefixPath, function (currtok) {
            return tokenLabel(currtok);
        }).join(", ");
        var occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
        var currMessage = "Ambiguous Alternatives Detected: <" + options.ambiguityIndices.join(" ,") + "> in <OR" + occurrence + ">" +
            (" inside <" + options.topLevelRule.name + "> Rule,\n") +
            ("<" + pathMsg + "> may appears as a prefix path in all these alternatives.\n");
        currMessage =
            currMessage +
                "See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES\n" +
                "For Further details.";
        return currMessage;
    },
    buildEmptyRepetitionError: function (options) {
        var dslName = getProductionDslName(options.repetition);
        if (options.repetition.idx !== 0) {
            dslName += options.repetition.idx;
        }
        var errMsg = "The repetition <" + dslName + "> within Rule <" + options.topLevelRule.name + "> can never consume any tokens.\n" +
            "This could lead to an infinite loop.";
        return errMsg;
    },
    // TODO: remove - `errors_public` from nyc.config.js exclude
    //       once this method is fully removed from this file
    buildTokenNameError: function (options) {
        /* istanbul ignore next */
        return "deprecated";
    },
    buildEmptyAlternationError: function (options) {
        var errMsg = "Ambiguous empty alternative: <" + (options.emptyChoiceIdx + 1) + ">" +
            (" in <OR" + options.alternation.idx + "> inside <" + options.topLevelRule.name + "> Rule.\n") +
            "Only the last alternative may be an empty alternative.";
        return errMsg;
    },
    buildTooManyAlternativesError: function (options) {
        var errMsg = "An Alternation cannot have more than 256 alternatives:\n" +
            ("<OR" + options.alternation.idx + "> inside <" + options.topLevelRule.name + "> Rule.\n has " + (options.alternation.definition.length + 1) + " alternatives.");
        return errMsg;
    },
    buildLeftRecursionError: function (options) {
        var ruleName = options.topLevelRule.name;
        var pathNames = utils/* map */.UI(options.leftRecursionPath, function (currRule) { return currRule.name; });
        var leftRecursivePath = ruleName + " --> " + pathNames
            .concat([ruleName])
            .join(" --> ");
        var errMsg = "Left Recursion found in grammar.\n" +
            ("rule: <" + ruleName + "> can be invoked from itself (directly or indirectly)\n") +
            ("without consuming any Tokens. The grammar path that causes this is: \n " + leftRecursivePath + "\n") +
            " To fix this refactor your grammar to remove the left recursion.\n" +
            "see: https://en.wikipedia.org/wiki/LL_parser#Left_Factoring.";
        return errMsg;
    },
    // TODO: remove - `errors_public` from nyc.config.js exclude
    //       once this method is fully removed from this file
    buildInvalidRuleNameError: function (options) {
        /* istanbul ignore next */
        return "deprecated";
    },
    buildDuplicateRuleNameError: function (options) {
        var ruleName;
        if (options.topLevelRule instanceof Rule) {
            ruleName = options.topLevelRule.name;
        }
        else {
            ruleName = options.topLevelRule;
        }
        var errMsg = "Duplicate definition, rule: ->" + ruleName + "<- is already defined in the grammar: ->" + options.grammarName + "<-";
        return errMsg;
    }
};
//# sourceMappingURL=errors_public.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/grammar/resolver.js
var resolver_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



function resolveGrammar(topLevels, errMsgProvider) {
    var refResolver = new GastRefResolverVisitor(topLevels, errMsgProvider);
    refResolver.resolveRefs();
    return refResolver.errors;
}
var GastRefResolverVisitor = /** @class */ (function (_super) {
    resolver_extends(GastRefResolverVisitor, _super);
    function GastRefResolverVisitor(nameToTopRule, errMsgProvider) {
        var _this = _super.call(this) || this;
        _this.nameToTopRule = nameToTopRule;
        _this.errMsgProvider = errMsgProvider;
        _this.errors = [];
        return _this;
    }
    GastRefResolverVisitor.prototype.resolveRefs = function () {
        var _this = this;
        (0,utils/* forEach */.Ed)((0,utils/* values */.VO)(this.nameToTopRule), function (prod) {
            _this.currTopLevel = prod;
            prod.accept(_this);
        });
    };
    GastRefResolverVisitor.prototype.visitNonTerminal = function (node) {
        var ref = this.nameToTopRule[node.nonTerminalName];
        if (!ref) {
            var msg = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, node);
            this.errors.push({
                message: msg,
                type: ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,
                ruleName: this.currTopLevel.name,
                unresolvedRefName: node.nonTerminalName
            });
        }
        else {
            node.referencedRule = ref;
        }
    };
    return GastRefResolverVisitor;
}(GAstVisitor));

//# sourceMappingURL=resolver.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/grammar/interpreter.js
var interpreter_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var AbstractNextPossibleTokensWalker = /** @class */ (function (_super) {
    interpreter_extends(AbstractNextPossibleTokensWalker, _super);
    function AbstractNextPossibleTokensWalker(topProd, path) {
        var _this = _super.call(this) || this;
        _this.topProd = topProd;
        _this.path = path;
        _this.possibleTokTypes = [];
        _this.nextProductionName = "";
        _this.nextProductionOccurrence = 0;
        _this.found = false;
        _this.isAtEndOfPath = false;
        return _this;
    }
    AbstractNextPossibleTokensWalker.prototype.startWalking = function () {
        this.found = false;
        if (this.path.ruleStack[0] !== this.topProd.name) {
            throw Error("The path does not start with the walker's top Rule!");
        }
        // immutable for the win
        this.ruleStack = (0,utils/* cloneArr */.Qw)(this.path.ruleStack).reverse(); // intelij bug requires assertion
        this.occurrenceStack = (0,utils/* cloneArr */.Qw)(this.path.occurrenceStack).reverse(); // intelij bug requires assertion
        // already verified that the first production is valid, we now seek the 2nd production
        this.ruleStack.pop();
        this.occurrenceStack.pop();
        this.updateExpectedNext();
        this.walk(this.topProd);
        return this.possibleTokTypes;
    };
    AbstractNextPossibleTokensWalker.prototype.walk = function (prod, prevRest) {
        if (prevRest === void 0) { prevRest = []; }
        // stop scanning once we found the path
        if (!this.found) {
            _super.prototype.walk.call(this, prod, prevRest);
        }
    };
    AbstractNextPossibleTokensWalker.prototype.walkProdRef = function (refProd, currRest, prevRest) {
        // found the next production, need to keep walking in it
        if (refProd.referencedRule.name === this.nextProductionName &&
            refProd.idx === this.nextProductionOccurrence) {
            var fullRest = currRest.concat(prevRest);
            this.updateExpectedNext();
            this.walk(refProd.referencedRule, fullRest);
        }
    };
    AbstractNextPossibleTokensWalker.prototype.updateExpectedNext = function () {
        // need to consume the Terminal
        if ((0,utils/* isEmpty */.xb)(this.ruleStack)) {
            // must reset nextProductionXXX to avoid walking down another Top Level production while what we are
            // really seeking is the last Terminal...
            this.nextProductionName = "";
            this.nextProductionOccurrence = 0;
            this.isAtEndOfPath = true;
        }
        else {
            this.nextProductionName = this.ruleStack.pop();
            this.nextProductionOccurrence = this.occurrenceStack.pop();
        }
    };
    return AbstractNextPossibleTokensWalker;
}(RestWalker));

var NextAfterTokenWalker = /** @class */ (function (_super) {
    interpreter_extends(NextAfterTokenWalker, _super);
    function NextAfterTokenWalker(topProd, path) {
        var _this = _super.call(this, topProd, path) || this;
        _this.path = path;
        _this.nextTerminalName = "";
        _this.nextTerminalOccurrence = 0;
        _this.nextTerminalName = _this.path.lastTok.name;
        _this.nextTerminalOccurrence = _this.path.lastTokOccurrence;
        return _this;
    }
    NextAfterTokenWalker.prototype.walkTerminal = function (terminal, currRest, prevRest) {
        if (this.isAtEndOfPath &&
            terminal.terminalType.name === this.nextTerminalName &&
            terminal.idx === this.nextTerminalOccurrence &&
            !this.found) {
            var fullRest = currRest.concat(prevRest);
            var restProd = new Alternative({ definition: fullRest });
            this.possibleTokTypes = first(restProd);
            this.found = true;
        }
    };
    return NextAfterTokenWalker;
}(AbstractNextPossibleTokensWalker));

/**
 * This walker only "walks" a single "TOP" level in the Grammar Ast, this means
 * it never "follows" production refs
 */
var AbstractNextTerminalAfterProductionWalker = /** @class */ (function (_super) {
    interpreter_extends(AbstractNextTerminalAfterProductionWalker, _super);
    function AbstractNextTerminalAfterProductionWalker(topRule, occurrence) {
        var _this = _super.call(this) || this;
        _this.topRule = topRule;
        _this.occurrence = occurrence;
        _this.result = {
            token: undefined,
            occurrence: undefined,
            isEndOfRule: undefined
        };
        return _this;
    }
    AbstractNextTerminalAfterProductionWalker.prototype.startWalking = function () {
        this.walk(this.topRule);
        return this.result;
    };
    return AbstractNextTerminalAfterProductionWalker;
}(RestWalker));

var NextTerminalAfterManyWalker = /** @class */ (function (_super) {
    interpreter_extends(NextTerminalAfterManyWalker, _super);
    function NextTerminalAfterManyWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NextTerminalAfterManyWalker.prototype.walkMany = function (manyProd, currRest, prevRest) {
        if (manyProd.idx === this.occurrence) {
            var firstAfterMany = (0,utils/* first */.Ps)(currRest.concat(prevRest));
            this.result.isEndOfRule = firstAfterMany === undefined;
            if (firstAfterMany instanceof Terminal) {
                this.result.token = firstAfterMany.terminalType;
                this.result.occurrence = firstAfterMany.idx;
            }
        }
        else {
            _super.prototype.walkMany.call(this, manyProd, currRest, prevRest);
        }
    };
    return NextTerminalAfterManyWalker;
}(AbstractNextTerminalAfterProductionWalker));

var NextTerminalAfterManySepWalker = /** @class */ (function (_super) {
    interpreter_extends(NextTerminalAfterManySepWalker, _super);
    function NextTerminalAfterManySepWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NextTerminalAfterManySepWalker.prototype.walkManySep = function (manySepProd, currRest, prevRest) {
        if (manySepProd.idx === this.occurrence) {
            var firstAfterManySep = (0,utils/* first */.Ps)(currRest.concat(prevRest));
            this.result.isEndOfRule = firstAfterManySep === undefined;
            if (firstAfterManySep instanceof Terminal) {
                this.result.token = firstAfterManySep.terminalType;
                this.result.occurrence = firstAfterManySep.idx;
            }
        }
        else {
            _super.prototype.walkManySep.call(this, manySepProd, currRest, prevRest);
        }
    };
    return NextTerminalAfterManySepWalker;
}(AbstractNextTerminalAfterProductionWalker));

var NextTerminalAfterAtLeastOneWalker = /** @class */ (function (_super) {
    interpreter_extends(NextTerminalAfterAtLeastOneWalker, _super);
    function NextTerminalAfterAtLeastOneWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NextTerminalAfterAtLeastOneWalker.prototype.walkAtLeastOne = function (atLeastOneProd, currRest, prevRest) {
        if (atLeastOneProd.idx === this.occurrence) {
            var firstAfterAtLeastOne = (0,utils/* first */.Ps)(currRest.concat(prevRest));
            this.result.isEndOfRule = firstAfterAtLeastOne === undefined;
            if (firstAfterAtLeastOne instanceof Terminal) {
                this.result.token = firstAfterAtLeastOne.terminalType;
                this.result.occurrence = firstAfterAtLeastOne.idx;
            }
        }
        else {
            _super.prototype.walkAtLeastOne.call(this, atLeastOneProd, currRest, prevRest);
        }
    };
    return NextTerminalAfterAtLeastOneWalker;
}(AbstractNextTerminalAfterProductionWalker));

// TODO: reduce code duplication in the AfterWalkers
var NextTerminalAfterAtLeastOneSepWalker = /** @class */ (function (_super) {
    interpreter_extends(NextTerminalAfterAtLeastOneSepWalker, _super);
    function NextTerminalAfterAtLeastOneSepWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NextTerminalAfterAtLeastOneSepWalker.prototype.walkAtLeastOneSep = function (atleastOneSepProd, currRest, prevRest) {
        if (atleastOneSepProd.idx === this.occurrence) {
            var firstAfterfirstAfterAtLeastOneSep = (0,utils/* first */.Ps)(currRest.concat(prevRest));
            this.result.isEndOfRule = firstAfterfirstAfterAtLeastOneSep === undefined;
            if (firstAfterfirstAfterAtLeastOneSep instanceof Terminal) {
                this.result.token = firstAfterfirstAfterAtLeastOneSep.terminalType;
                this.result.occurrence = firstAfterfirstAfterAtLeastOneSep.idx;
            }
        }
        else {
            _super.prototype.walkAtLeastOneSep.call(this, atleastOneSepProd, currRest, prevRest);
        }
    };
    return NextTerminalAfterAtLeastOneSepWalker;
}(AbstractNextTerminalAfterProductionWalker));

function possiblePathsFrom(targetDef, maxLength, currPath) {
    if (currPath === void 0) { currPath = []; }
    // avoid side effects
    currPath = (0,utils/* cloneArr */.Qw)(currPath);
    var result = [];
    var i = 0;
    // TODO: avoid inner funcs
    function remainingPathWith(nextDef) {
        return nextDef.concat((0,utils/* drop */.Cw)(targetDef, i + 1));
    }
    // TODO: avoid inner funcs
    function getAlternativesForProd(definition) {
        var alternatives = possiblePathsFrom(remainingPathWith(definition), maxLength, currPath);
        return result.concat(alternatives);
    }
    /**
     * Mandatory productions will halt the loop as the paths computed from their recursive calls will already contain the
     * following (rest) of the targetDef.
     *
     * For optional productions (Option/Repetition/...) the loop will continue to represent the paths that do not include the
     * the optional production.
     */
    while (currPath.length < maxLength && i < targetDef.length) {
        var prod = targetDef[i];
        /* istanbul ignore else */
        if (prod instanceof Alternative) {
            return getAlternativesForProd(prod.definition);
        }
        else if (prod instanceof NonTerminal) {
            return getAlternativesForProd(prod.definition);
        }
        else if (prod instanceof Option) {
            result = getAlternativesForProd(prod.definition);
        }
        else if (prod instanceof RepetitionMandatory) {
            var newDef = prod.definition.concat([
                new Repetition({
                    definition: prod.definition
                })
            ]);
            return getAlternativesForProd(newDef);
        }
        else if (prod instanceof RepetitionMandatoryWithSeparator) {
            var newDef = [
                new Alternative({ definition: prod.definition }),
                new Repetition({
                    definition: [new Terminal({ terminalType: prod.separator })].concat(prod.definition)
                })
            ];
            return getAlternativesForProd(newDef);
        }
        else if (prod instanceof RepetitionWithSeparator) {
            var newDef = prod.definition.concat([
                new Repetition({
                    definition: [new Terminal({ terminalType: prod.separator })].concat(prod.definition)
                })
            ]);
            result = getAlternativesForProd(newDef);
        }
        else if (prod instanceof Repetition) {
            var newDef = prod.definition.concat([
                new Repetition({
                    definition: prod.definition
                })
            ]);
            result = getAlternativesForProd(newDef);
        }
        else if (prod instanceof Alternation) {
            (0,utils/* forEach */.Ed)(prod.definition, function (currAlt) {
                // TODO: this is a limited check for empty alternatives
                //   It would prevent a common case of infinite loops during parser initialization.
                //   However **in-directly** empty alternatives may still cause issues.
                if ((0,utils/* isEmpty */.xb)(currAlt.definition) === false) {
                    result = getAlternativesForProd(currAlt.definition);
                }
            });
            return result;
        }
        else if (prod instanceof Terminal) {
            currPath.push(prod.terminalType);
        }
        else {
            throw Error("non exhaustive match");
        }
        i++;
    }
    result.push({
        partialPath: currPath,
        suffixDef: (0,utils/* drop */.Cw)(targetDef, i)
    });
    return result;
}
function nextPossibleTokensAfter(initialDef, tokenVector, tokMatcher, maxLookAhead) {
    var EXIT_NON_TERMINAL = "EXIT_NONE_TERMINAL";
    // to avoid creating a new Array each time.
    var EXIT_NON_TERMINAL_ARR = [EXIT_NON_TERMINAL];
    var EXIT_ALTERNATIVE = "EXIT_ALTERNATIVE";
    var foundCompletePath = false;
    var tokenVectorLength = tokenVector.length;
    var minimalAlternativesIndex = tokenVectorLength - maxLookAhead - 1;
    var result = [];
    var possiblePaths = [];
    possiblePaths.push({
        idx: -1,
        def: initialDef,
        ruleStack: [],
        occurrenceStack: []
    });
    while (!(0,utils/* isEmpty */.xb)(possiblePaths)) {
        var currPath = possiblePaths.pop();
        // skip alternatives if no more results can be found (assuming deterministic grammar with fixed lookahead)
        if (currPath === EXIT_ALTERNATIVE) {
            if (foundCompletePath &&
                (0,utils/* last */.Z$)(possiblePaths).idx <= minimalAlternativesIndex) {
                // remove irrelevant alternative
                possiblePaths.pop();
            }
            continue;
        }
        var currDef = currPath.def;
        var currIdx = currPath.idx;
        var currRuleStack = currPath.ruleStack;
        var currOccurrenceStack = currPath.occurrenceStack;
        // For Example: an empty path could exist in a valid grammar in the case of an EMPTY_ALT
        if ((0,utils/* isEmpty */.xb)(currDef)) {
            continue;
        }
        var prod = currDef[0];
        /* istanbul ignore else */
        if (prod === EXIT_NON_TERMINAL) {
            var nextPath = {
                idx: currIdx,
                def: (0,utils/* drop */.Cw)(currDef),
                ruleStack: (0,utils/* dropRight */.j7)(currRuleStack),
                occurrenceStack: (0,utils/* dropRight */.j7)(currOccurrenceStack)
            };
            possiblePaths.push(nextPath);
        }
        else if (prod instanceof Terminal) {
            /* istanbul ignore else */
            if (currIdx < tokenVectorLength - 1) {
                var nextIdx = currIdx + 1;
                var actualToken = tokenVector[nextIdx];
                if (tokMatcher(actualToken, prod.terminalType)) {
                    var nextPath = {
                        idx: nextIdx,
                        def: (0,utils/* drop */.Cw)(currDef),
                        ruleStack: currRuleStack,
                        occurrenceStack: currOccurrenceStack
                    };
                    possiblePaths.push(nextPath);
                }
                // end of the line
            }
            else if (currIdx === tokenVectorLength - 1) {
                // IGNORE ABOVE ELSE
                result.push({
                    nextTokenType: prod.terminalType,
                    nextTokenOccurrence: prod.idx,
                    ruleStack: currRuleStack,
                    occurrenceStack: currOccurrenceStack
                });
                foundCompletePath = true;
            }
            else {
                throw Error("non exhaustive match");
            }
        }
        else if (prod instanceof NonTerminal) {
            var newRuleStack = (0,utils/* cloneArr */.Qw)(currRuleStack);
            newRuleStack.push(prod.nonTerminalName);
            var newOccurrenceStack = (0,utils/* cloneArr */.Qw)(currOccurrenceStack);
            newOccurrenceStack.push(prod.idx);
            var nextPath = {
                idx: currIdx,
                def: prod.definition.concat(EXIT_NON_TERMINAL_ARR, (0,utils/* drop */.Cw)(currDef)),
                ruleStack: newRuleStack,
                occurrenceStack: newOccurrenceStack
            };
            possiblePaths.push(nextPath);
        }
        else if (prod instanceof Option) {
            // the order of alternatives is meaningful, FILO (Last path will be traversed first).
            var nextPathWithout = {
                idx: currIdx,
                def: (0,utils/* drop */.Cw)(currDef),
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPathWithout);
            // required marker to avoid backtracking paths whose higher priority alternatives already matched
            possiblePaths.push(EXIT_ALTERNATIVE);
            var nextPathWith = {
                idx: currIdx,
                def: prod.definition.concat((0,utils/* drop */.Cw)(currDef)),
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPathWith);
        }
        else if (prod instanceof RepetitionMandatory) {
            // TODO:(THE NEW operators here take a while...) (convert once?)
            var secondIteration = new Repetition({
                definition: prod.definition,
                idx: prod.idx
            });
            var nextDef = prod.definition.concat([secondIteration], (0,utils/* drop */.Cw)(currDef));
            var nextPath = {
                idx: currIdx,
                def: nextDef,
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPath);
        }
        else if (prod instanceof RepetitionMandatoryWithSeparator) {
            // TODO:(THE NEW operators here take a while...) (convert once?)
            var separatorGast = new Terminal({
                terminalType: prod.separator
            });
            var secondIteration = new Repetition({
                definition: [separatorGast].concat(prod.definition),
                idx: prod.idx
            });
            var nextDef = prod.definition.concat([secondIteration], (0,utils/* drop */.Cw)(currDef));
            var nextPath = {
                idx: currIdx,
                def: nextDef,
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPath);
        }
        else if (prod instanceof RepetitionWithSeparator) {
            // the order of alternatives is meaningful, FILO (Last path will be traversed first).
            var nextPathWithout = {
                idx: currIdx,
                def: (0,utils/* drop */.Cw)(currDef),
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPathWithout);
            // required marker to avoid backtracking paths whose higher priority alternatives already matched
            possiblePaths.push(EXIT_ALTERNATIVE);
            var separatorGast = new Terminal({
                terminalType: prod.separator
            });
            var nthRepetition = new Repetition({
                definition: [separatorGast].concat(prod.definition),
                idx: prod.idx
            });
            var nextDef = prod.definition.concat([nthRepetition], (0,utils/* drop */.Cw)(currDef));
            var nextPathWith = {
                idx: currIdx,
                def: nextDef,
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPathWith);
        }
        else if (prod instanceof Repetition) {
            // the order of alternatives is meaningful, FILO (Last path will be traversed first).
            var nextPathWithout = {
                idx: currIdx,
                def: (0,utils/* drop */.Cw)(currDef),
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPathWithout);
            // required marker to avoid backtracking paths whose higher priority alternatives already matched
            possiblePaths.push(EXIT_ALTERNATIVE);
            // TODO: an empty repetition will cause infinite loops here, will the parser detect this in selfAnalysis?
            var nthRepetition = new Repetition({
                definition: prod.definition,
                idx: prod.idx
            });
            var nextDef = prod.definition.concat([nthRepetition], (0,utils/* drop */.Cw)(currDef));
            var nextPathWith = {
                idx: currIdx,
                def: nextDef,
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPathWith);
        }
        else if (prod instanceof Alternation) {
            // the order of alternatives is meaningful, FILO (Last path will be traversed first).
            for (var i = prod.definition.length - 1; i >= 0; i--) {
                var currAlt = prod.definition[i];
                var currAltPath = {
                    idx: currIdx,
                    def: currAlt.definition.concat((0,utils/* drop */.Cw)(currDef)),
                    ruleStack: currRuleStack,
                    occurrenceStack: currOccurrenceStack
                };
                possiblePaths.push(currAltPath);
                possiblePaths.push(EXIT_ALTERNATIVE);
            }
        }
        else if (prod instanceof Alternative) {
            possiblePaths.push({
                idx: currIdx,
                def: prod.definition.concat((0,utils/* drop */.Cw)(currDef)),
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            });
        }
        else if (prod instanceof Rule) {
            // last because we should only encounter at most a single one of these per invocation.
            possiblePaths.push(expandTopLevelRule(prod, currIdx, currRuleStack, currOccurrenceStack));
        }
        else {
            throw Error("non exhaustive match");
        }
    }
    return result;
}
function expandTopLevelRule(topRule, currIdx, currRuleStack, currOccurrenceStack) {
    var newRuleStack = (0,utils/* cloneArr */.Qw)(currRuleStack);
    newRuleStack.push(topRule.name);
    var newCurrOccurrenceStack = (0,utils/* cloneArr */.Qw)(currOccurrenceStack);
    // top rule is always assumed to have been called with occurrence index 1
    newCurrOccurrenceStack.push(1);
    return {
        idx: currIdx,
        def: topRule.definition,
        ruleStack: newRuleStack,
        occurrenceStack: newCurrOccurrenceStack
    };
}
//# sourceMappingURL=interpreter.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/grammar/lookahead.js
var lookahead_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var PROD_TYPE;
(function (PROD_TYPE) {
    PROD_TYPE[PROD_TYPE["OPTION"] = 0] = "OPTION";
    PROD_TYPE[PROD_TYPE["REPETITION"] = 1] = "REPETITION";
    PROD_TYPE[PROD_TYPE["REPETITION_MANDATORY"] = 2] = "REPETITION_MANDATORY";
    PROD_TYPE[PROD_TYPE["REPETITION_MANDATORY_WITH_SEPARATOR"] = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR";
    PROD_TYPE[PROD_TYPE["REPETITION_WITH_SEPARATOR"] = 4] = "REPETITION_WITH_SEPARATOR";
    PROD_TYPE[PROD_TYPE["ALTERNATION"] = 5] = "ALTERNATION";
})(PROD_TYPE || (PROD_TYPE = {}));
function getProdType(prod) {
    /* istanbul ignore else */
    if (prod instanceof Option) {
        return PROD_TYPE.OPTION;
    }
    else if (prod instanceof Repetition) {
        return PROD_TYPE.REPETITION;
    }
    else if (prod instanceof RepetitionMandatory) {
        return PROD_TYPE.REPETITION_MANDATORY;
    }
    else if (prod instanceof RepetitionMandatoryWithSeparator) {
        return PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR;
    }
    else if (prod instanceof RepetitionWithSeparator) {
        return PROD_TYPE.REPETITION_WITH_SEPARATOR;
    }
    else if (prod instanceof Alternation) {
        return PROD_TYPE.ALTERNATION;
    }
    else {
        throw Error("non exhaustive match");
    }
}
function buildLookaheadFuncForOr(occurrence, ruleGrammar, maxLookahead, hasPredicates, dynamicTokensEnabled, laFuncBuilder) {
    var lookAheadPaths = getLookaheadPathsForOr(occurrence, ruleGrammar, maxLookahead);
    var tokenMatcher = areTokenCategoriesNotUsed(lookAheadPaths)
        ? tokenStructuredMatcherNoCategories
        : tokenStructuredMatcher;
    return laFuncBuilder(lookAheadPaths, hasPredicates, tokenMatcher, dynamicTokensEnabled);
}
/**
 *  When dealing with an Optional production (OPTION/MANY/2nd iteration of AT_LEAST_ONE/...) we need to compare
 *  the lookahead "inside" the production and the lookahead immediately "after" it in the same top level rule (context free).
 *
 *  Example: given a production:
 *  ABC(DE)?DF
 *
 *  The optional '(DE)?' should only be entered if we see 'DE'. a single Token 'D' is not sufficient to distinguish between the two
 *  alternatives.
 *
 *  @returns A Lookahead function which will return true IFF the parser should parse the Optional production.
 */
function buildLookaheadFuncForOptionalProd(occurrence, ruleGrammar, k, dynamicTokensEnabled, prodType, lookaheadBuilder) {
    var lookAheadPaths = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k);
    var tokenMatcher = areTokenCategoriesNotUsed(lookAheadPaths)
        ? tokenStructuredMatcherNoCategories
        : tokenStructuredMatcher;
    return lookaheadBuilder(lookAheadPaths[0], tokenMatcher, dynamicTokensEnabled);
}
function buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher, dynamicTokensEnabled) {
    var numOfAlts = alts.length;
    var areAllOneTokenLookahead = (0,utils/* every */.yW)(alts, function (currAlt) {
        return (0,utils/* every */.yW)(currAlt, function (currPath) {
            return currPath.length === 1;
        });
    });
    // This version takes into account the predicates as well.
    if (hasPredicates) {
        /**
         * @returns {number} - The chosen alternative index
         */
        return function (orAlts) {
            // unfortunately the predicates must be extracted every single time
            // as they cannot be cached due to references to parameters(vars) which are no longer valid.
            // note that in the common case of no predicates, no cpu time will be wasted on this (see else block)
            var predicates = (0,utils/* map */.UI)(orAlts, function (currAlt) { return currAlt.GATE; });
            for (var t = 0; t < numOfAlts; t++) {
                var currAlt = alts[t];
                var currNumOfPaths = currAlt.length;
                var currPredicate = predicates[t];
                if (currPredicate !== undefined && currPredicate.call(this) === false) {
                    // if the predicate does not match there is no point in checking the paths
                    continue;
                }
                nextPath: for (var j = 0; j < currNumOfPaths; j++) {
                    var currPath = currAlt[j];
                    var currPathLength = currPath.length;
                    for (var i = 0; i < currPathLength; i++) {
                        var nextToken = this.LA(i + 1);
                        if (tokenMatcher(nextToken, currPath[i]) === false) {
                            // mismatch in current path
                            // try the next pth
                            continue nextPath;
                        }
                    }
                    // found a full path that matches.
                    // this will also work for an empty ALT as the loop will be skipped
                    return t;
                }
                // none of the paths for the current alternative matched
                // try the next alternative
            }
            // none of the alternatives could be matched
            return undefined;
        };
    }
    else if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
        // optimized (common) case of all the lookaheads paths requiring only
        // a single token lookahead. These Optimizations cannot work if dynamically defined Tokens are used.
        var singleTokenAlts = (0,utils/* map */.UI)(alts, function (currAlt) {
            return (0,utils/* flatten */.xH)(currAlt);
        });
        var choiceToAlt_1 = (0,utils/* reduce */.u4)(singleTokenAlts, function (result, currAlt, idx) {
            (0,utils/* forEach */.Ed)(currAlt, function (currTokType) {
                if (!(0,utils/* has */.e$)(result, currTokType.tokenTypeIdx)) {
                    result[currTokType.tokenTypeIdx] = idx;
                }
                (0,utils/* forEach */.Ed)(currTokType.categoryMatches, function (currExtendingType) {
                    if (!(0,utils/* has */.e$)(result, currExtendingType)) {
                        result[currExtendingType] = idx;
                    }
                });
            });
            return result;
        }, []);
        /**
         * @returns {number} - The chosen alternative index
         */
        return function () {
            var nextToken = this.LA(1);
            return choiceToAlt_1[nextToken.tokenTypeIdx];
        };
    }
    else {
        // optimized lookahead without needing to check the predicates at all.
        // this causes code duplication which is intentional to improve performance.
        /**
         * @returns {number} - The chosen alternative index
         */
        return function () {
            for (var t = 0; t < numOfAlts; t++) {
                var currAlt = alts[t];
                var currNumOfPaths = currAlt.length;
                nextPath: for (var j = 0; j < currNumOfPaths; j++) {
                    var currPath = currAlt[j];
                    var currPathLength = currPath.length;
                    for (var i = 0; i < currPathLength; i++) {
                        var nextToken = this.LA(i + 1);
                        if (tokenMatcher(nextToken, currPath[i]) === false) {
                            // mismatch in current path
                            // try the next pth
                            continue nextPath;
                        }
                    }
                    // found a full path that matches.
                    // this will also work for an empty ALT as the loop will be skipped
                    return t;
                }
                // none of the paths for the current alternative matched
                // try the next alternative
            }
            // none of the alternatives could be matched
            return undefined;
        };
    }
}
function buildSingleAlternativeLookaheadFunction(alt, tokenMatcher, dynamicTokensEnabled) {
    var areAllOneTokenLookahead = (0,utils/* every */.yW)(alt, function (currPath) {
        return currPath.length === 1;
    });
    var numOfPaths = alt.length;
    // optimized (common) case of all the lookaheads paths requiring only
    // a single token lookahead.
    if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
        var singleTokensTypes = (0,utils/* flatten */.xH)(alt);
        if (singleTokensTypes.length === 1 &&
            (0,utils/* isEmpty */.xb)(singleTokensTypes[0].categoryMatches)) {
            var expectedTokenType = singleTokensTypes[0];
            var expectedTokenUniqueKey_1 = expectedTokenType.tokenTypeIdx;
            return function () {
                return this.LA(1).tokenTypeIdx === expectedTokenUniqueKey_1;
            };
        }
        else {
            var choiceToAlt_2 = (0,utils/* reduce */.u4)(singleTokensTypes, function (result, currTokType, idx) {
                result[currTokType.tokenTypeIdx] = true;
                (0,utils/* forEach */.Ed)(currTokType.categoryMatches, function (currExtendingType) {
                    result[currExtendingType] = true;
                });
                return result;
            }, []);
            return function () {
                var nextToken = this.LA(1);
                return choiceToAlt_2[nextToken.tokenTypeIdx] === true;
            };
        }
    }
    else {
        return function () {
            nextPath: for (var j = 0; j < numOfPaths; j++) {
                var currPath = alt[j];
                var currPathLength = currPath.length;
                for (var i = 0; i < currPathLength; i++) {
                    var nextToken = this.LA(i + 1);
                    if (tokenMatcher(nextToken, currPath[i]) === false) {
                        // mismatch in current path
                        // try the next pth
                        continue nextPath;
                    }
                }
                // found a full path that matches.
                return true;
            }
            // none of the paths matched
            return false;
        };
    }
}
var RestDefinitionFinderWalker = /** @class */ (function (_super) {
    lookahead_extends(RestDefinitionFinderWalker, _super);
    function RestDefinitionFinderWalker(topProd, targetOccurrence, targetProdType) {
        var _this = _super.call(this) || this;
        _this.topProd = topProd;
        _this.targetOccurrence = targetOccurrence;
        _this.targetProdType = targetProdType;
        return _this;
    }
    RestDefinitionFinderWalker.prototype.startWalking = function () {
        this.walk(this.topProd);
        return this.restDef;
    };
    RestDefinitionFinderWalker.prototype.checkIsTarget = function (node, expectedProdType, currRest, prevRest) {
        if (node.idx === this.targetOccurrence &&
            this.targetProdType === expectedProdType) {
            this.restDef = currRest.concat(prevRest);
            return true;
        }
        // performance optimization, do not iterate over the entire Grammar ast after we have found the target
        return false;
    };
    RestDefinitionFinderWalker.prototype.walkOption = function (optionProd, currRest, prevRest) {
        if (!this.checkIsTarget(optionProd, PROD_TYPE.OPTION, currRest, prevRest)) {
            _super.prototype.walkOption.call(this, optionProd, currRest, prevRest);
        }
    };
    RestDefinitionFinderWalker.prototype.walkAtLeastOne = function (atLeastOneProd, currRest, prevRest) {
        if (!this.checkIsTarget(atLeastOneProd, PROD_TYPE.REPETITION_MANDATORY, currRest, prevRest)) {
            _super.prototype.walkOption.call(this, atLeastOneProd, currRest, prevRest);
        }
    };
    RestDefinitionFinderWalker.prototype.walkAtLeastOneSep = function (atLeastOneSepProd, currRest, prevRest) {
        if (!this.checkIsTarget(atLeastOneSepProd, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currRest, prevRest)) {
            _super.prototype.walkOption.call(this, atLeastOneSepProd, currRest, prevRest);
        }
    };
    RestDefinitionFinderWalker.prototype.walkMany = function (manyProd, currRest, prevRest) {
        if (!this.checkIsTarget(manyProd, PROD_TYPE.REPETITION, currRest, prevRest)) {
            _super.prototype.walkOption.call(this, manyProd, currRest, prevRest);
        }
    };
    RestDefinitionFinderWalker.prototype.walkManySep = function (manySepProd, currRest, prevRest) {
        if (!this.checkIsTarget(manySepProd, PROD_TYPE.REPETITION_WITH_SEPARATOR, currRest, prevRest)) {
            _super.prototype.walkOption.call(this, manySepProd, currRest, prevRest);
        }
    };
    return RestDefinitionFinderWalker;
}(RestWalker));
/**
 * Returns the definition of a target production in a top level level rule.
 */
var InsideDefinitionFinderVisitor = /** @class */ (function (_super) {
    lookahead_extends(InsideDefinitionFinderVisitor, _super);
    function InsideDefinitionFinderVisitor(targetOccurrence, targetProdType, targetRef) {
        var _this = _super.call(this) || this;
        _this.targetOccurrence = targetOccurrence;
        _this.targetProdType = targetProdType;
        _this.targetRef = targetRef;
        _this.result = [];
        return _this;
    }
    InsideDefinitionFinderVisitor.prototype.checkIsTarget = function (node, expectedProdName) {
        if (node.idx === this.targetOccurrence &&
            this.targetProdType === expectedProdName &&
            (this.targetRef === undefined || node === this.targetRef)) {
            this.result = node.definition;
        }
    };
    InsideDefinitionFinderVisitor.prototype.visitOption = function (node) {
        this.checkIsTarget(node, PROD_TYPE.OPTION);
    };
    InsideDefinitionFinderVisitor.prototype.visitRepetition = function (node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION);
    };
    InsideDefinitionFinderVisitor.prototype.visitRepetitionMandatory = function (node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY);
    };
    InsideDefinitionFinderVisitor.prototype.visitRepetitionMandatoryWithSeparator = function (node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR);
    };
    InsideDefinitionFinderVisitor.prototype.visitRepetitionWithSeparator = function (node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION_WITH_SEPARATOR);
    };
    InsideDefinitionFinderVisitor.prototype.visitAlternation = function (node) {
        this.checkIsTarget(node, PROD_TYPE.ALTERNATION);
    };
    return InsideDefinitionFinderVisitor;
}(GAstVisitor));
function initializeArrayOfArrays(size) {
    var result = new Array(size);
    for (var i = 0; i < size; i++) {
        result[i] = [];
    }
    return result;
}
/**
 * A sort of hash function between a Path in the grammar and a string.
 * Note that this returns multiple "hashes" to support the scenario of token categories.
 * -  A single path with categories may match multiple **actual** paths.
 */
function pathToHashKeys(path) {
    var keys = [""];
    for (var i = 0; i < path.length; i++) {
        var tokType = path[i];
        var longerKeys = [];
        for (var j = 0; j < keys.length; j++) {
            var currShorterKey = keys[j];
            longerKeys.push(currShorterKey + "_" + tokType.tokenTypeIdx);
            for (var t = 0; t < tokType.categoryMatches.length; t++) {
                var categoriesKeySuffix = "_" + tokType.categoryMatches[t];
                longerKeys.push(currShorterKey + categoriesKeySuffix);
            }
        }
        keys = longerKeys;
    }
    return keys;
}
/**
 * Imperative style due to being called from a hot spot
 */
function isUniquePrefixHash(altKnownPathsKeys, searchPathKeys, idx) {
    for (var currAltIdx = 0; currAltIdx < altKnownPathsKeys.length; currAltIdx++) {
        // We only want to test vs the other alternatives
        if (currAltIdx === idx) {
            continue;
        }
        var otherAltKnownPathsKeys = altKnownPathsKeys[currAltIdx];
        for (var searchIdx = 0; searchIdx < searchPathKeys.length; searchIdx++) {
            var searchKey = searchPathKeys[searchIdx];
            if (otherAltKnownPathsKeys[searchKey] === true) {
                return false;
            }
        }
    }
    // None of the SearchPathKeys were found in any of the other alternatives
    return true;
}
function lookAheadSequenceFromAlternatives(altsDefs, k) {
    var partialAlts = (0,utils/* map */.UI)(altsDefs, function (currAlt) { return possiblePathsFrom([currAlt], 1); });
    var finalResult = initializeArrayOfArrays(partialAlts.length);
    var altsHashes = (0,utils/* map */.UI)(partialAlts, function (currAltPaths) {
        var dict = {};
        (0,utils/* forEach */.Ed)(currAltPaths, function (item) {
            var keys = pathToHashKeys(item.partialPath);
            (0,utils/* forEach */.Ed)(keys, function (currKey) {
                dict[currKey] = true;
            });
        });
        return dict;
    });
    var newData = partialAlts;
    // maxLookahead loop
    for (var pathLength = 1; pathLength <= k; pathLength++) {
        var currDataset = newData;
        newData = initializeArrayOfArrays(currDataset.length);
        var _loop_1 = function (altIdx) {
            var currAltPathsAndSuffixes = currDataset[altIdx];
            // paths in current alternative loop
            for (var currPathIdx = 0; currPathIdx < currAltPathsAndSuffixes.length; currPathIdx++) {
                var currPathPrefix = currAltPathsAndSuffixes[currPathIdx].partialPath;
                var suffixDef = currAltPathsAndSuffixes[currPathIdx].suffixDef;
                var prefixKeys = pathToHashKeys(currPathPrefix);
                var isUnique = isUniquePrefixHash(altsHashes, prefixKeys, altIdx);
                // End of the line for this path.
                if (isUnique || (0,utils/* isEmpty */.xb)(suffixDef) || currPathPrefix.length === k) {
                    var currAltResult = finalResult[altIdx];
                    // TODO: Can we implement a containsPath using Maps/Dictionaries?
                    if (containsPath(currAltResult, currPathPrefix) === false) {
                        currAltResult.push(currPathPrefix);
                        // Update all new  keys for the current path.
                        for (var j = 0; j < prefixKeys.length; j++) {
                            var currKey = prefixKeys[j];
                            altsHashes[altIdx][currKey] = true;
                        }
                    }
                }
                // Expand longer paths
                else {
                    var newPartialPathsAndSuffixes = possiblePathsFrom(suffixDef, pathLength + 1, currPathPrefix);
                    newData[altIdx] = newData[altIdx].concat(newPartialPathsAndSuffixes);
                    // Update keys for new known paths
                    (0,utils/* forEach */.Ed)(newPartialPathsAndSuffixes, function (item) {
                        var prefixKeys = pathToHashKeys(item.partialPath);
                        (0,utils/* forEach */.Ed)(prefixKeys, function (key) {
                            altsHashes[altIdx][key] = true;
                        });
                    });
                }
            }
        };
        // alternatives loop
        for (var altIdx = 0; altIdx < currDataset.length; altIdx++) {
            _loop_1(altIdx);
        }
    }
    return finalResult;
}
function getLookaheadPathsForOr(occurrence, ruleGrammar, k, orProd) {
    var visitor = new InsideDefinitionFinderVisitor(occurrence, PROD_TYPE.ALTERNATION, orProd);
    ruleGrammar.accept(visitor);
    return lookAheadSequenceFromAlternatives(visitor.result, k);
}
function getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k) {
    var insideDefVisitor = new InsideDefinitionFinderVisitor(occurrence, prodType);
    ruleGrammar.accept(insideDefVisitor);
    var insideDef = insideDefVisitor.result;
    var afterDefWalker = new RestDefinitionFinderWalker(ruleGrammar, occurrence, prodType);
    var afterDef = afterDefWalker.startWalking();
    var insideFlat = new Alternative({ definition: insideDef });
    var afterFlat = new Alternative({ definition: afterDef });
    return lookAheadSequenceFromAlternatives([insideFlat, afterFlat], k);
}
function containsPath(alternative, searchPath) {
    compareOtherPath: for (var i = 0; i < alternative.length; i++) {
        var otherPath = alternative[i];
        if (otherPath.length !== searchPath.length) {
            continue;
        }
        for (var j = 0; j < otherPath.length; j++) {
            var searchTok = searchPath[j];
            var otherTok = otherPath[j];
            var matchingTokens = searchTok === otherTok ||
                otherTok.categoryMatchesMap[searchTok.tokenTypeIdx] !== undefined;
            if (matchingTokens === false) {
                continue compareOtherPath;
            }
        }
        return true;
    }
    return false;
}
function isStrictPrefixOfPath(prefix, other) {
    return (prefix.length < other.length &&
        (0,utils/* every */.yW)(prefix, function (tokType, idx) {
            var otherTokType = other[idx];
            return (tokType === otherTokType ||
                otherTokType.categoryMatchesMap[tokType.tokenTypeIdx]);
        }));
}
function areTokenCategoriesNotUsed(lookAheadPaths) {
    return (0,utils/* every */.yW)(lookAheadPaths, function (singleAltPaths) {
        return (0,utils/* every */.yW)(singleAltPaths, function (singlePath) {
            return (0,utils/* every */.yW)(singlePath, function (token) { return (0,utils/* isEmpty */.xb)(token.categoryMatches); });
        });
    });
}
//# sourceMappingURL=lookahead.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/grammar/checks.js
var checks_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();








function validateGrammar(topLevels, globalMaxLookahead, tokenTypes, errMsgProvider, grammarName) {
    var duplicateErrors = utils/* map */.UI(topLevels, function (currTopLevel) {
        return validateDuplicateProductions(currTopLevel, errMsgProvider);
    });
    var leftRecursionErrors = utils/* map */.UI(topLevels, function (currTopRule) {
        return validateNoLeftRecursion(currTopRule, currTopRule, errMsgProvider);
    });
    var emptyAltErrors = [];
    var ambiguousAltsErrors = [];
    var emptyRepetitionErrors = [];
    // left recursion could cause infinite loops in the following validations.
    // It is safest to first have the user fix the left recursion errors first and only then examine Further issues.
    if ((0,utils/* every */.yW)(leftRecursionErrors, utils/* isEmpty */.xb)) {
        emptyAltErrors = (0,utils/* map */.UI)(topLevels, function (currTopRule) {
            return validateEmptyOrAlternative(currTopRule, errMsgProvider);
        });
        ambiguousAltsErrors = (0,utils/* map */.UI)(topLevels, function (currTopRule) {
            return validateAmbiguousAlternationAlternatives(currTopRule, globalMaxLookahead, errMsgProvider);
        });
        emptyRepetitionErrors = validateSomeNonEmptyLookaheadPath(topLevels, globalMaxLookahead, errMsgProvider);
    }
    var termsNamespaceConflictErrors = checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider);
    var tooManyAltsErrors = (0,utils/* map */.UI)(topLevels, function (curRule) {
        return validateTooManyAlts(curRule, errMsgProvider);
    });
    var duplicateRulesError = (0,utils/* map */.UI)(topLevels, function (curRule) {
        return validateRuleDoesNotAlreadyExist(curRule, topLevels, grammarName, errMsgProvider);
    });
    return (utils/* flatten */.xH(duplicateErrors.concat(emptyRepetitionErrors, leftRecursionErrors, emptyAltErrors, ambiguousAltsErrors, termsNamespaceConflictErrors, tooManyAltsErrors, duplicateRulesError)));
}
function validateDuplicateProductions(topLevelRule, errMsgProvider) {
    var collectorVisitor = new OccurrenceValidationCollector();
    topLevelRule.accept(collectorVisitor);
    var allRuleProductions = collectorVisitor.allProductions;
    var productionGroups = utils/* groupBy */.vM(allRuleProductions, identifyProductionForDuplicates);
    var duplicates = utils/* pick */.ei(productionGroups, function (currGroup) {
        return currGroup.length > 1;
    });
    var errors = utils/* map */.UI(utils/* values */.VO(duplicates), function (currDuplicates) {
        var firstProd = utils/* first */.Ps(currDuplicates);
        var msg = errMsgProvider.buildDuplicateFoundError(topLevelRule, currDuplicates);
        var dslName = getProductionDslName(firstProd);
        var defError = {
            message: msg,
            type: ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,
            ruleName: topLevelRule.name,
            dslName: dslName,
            occurrence: firstProd.idx
        };
        var param = getExtraProductionArgument(firstProd);
        if (param) {
            defError.parameter = param;
        }
        return defError;
    });
    return errors;
}
function identifyProductionForDuplicates(prod) {
    return getProductionDslName(prod) + "_#_" + prod.idx + "_#_" + getExtraProductionArgument(prod);
}
function getExtraProductionArgument(prod) {
    if (prod instanceof Terminal) {
        return prod.terminalType.name;
    }
    else if (prod instanceof NonTerminal) {
        return prod.nonTerminalName;
    }
    else {
        return "";
    }
}
var OccurrenceValidationCollector = /** @class */ (function (_super) {
    checks_extends(OccurrenceValidationCollector, _super);
    function OccurrenceValidationCollector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.allProductions = [];
        return _this;
    }
    OccurrenceValidationCollector.prototype.visitNonTerminal = function (subrule) {
        this.allProductions.push(subrule);
    };
    OccurrenceValidationCollector.prototype.visitOption = function (option) {
        this.allProductions.push(option);
    };
    OccurrenceValidationCollector.prototype.visitRepetitionWithSeparator = function (manySep) {
        this.allProductions.push(manySep);
    };
    OccurrenceValidationCollector.prototype.visitRepetitionMandatory = function (atLeastOne) {
        this.allProductions.push(atLeastOne);
    };
    OccurrenceValidationCollector.prototype.visitRepetitionMandatoryWithSeparator = function (atLeastOneSep) {
        this.allProductions.push(atLeastOneSep);
    };
    OccurrenceValidationCollector.prototype.visitRepetition = function (many) {
        this.allProductions.push(many);
    };
    OccurrenceValidationCollector.prototype.visitAlternation = function (or) {
        this.allProductions.push(or);
    };
    OccurrenceValidationCollector.prototype.visitTerminal = function (terminal) {
        this.allProductions.push(terminal);
    };
    return OccurrenceValidationCollector;
}(GAstVisitor));

function validateRuleDoesNotAlreadyExist(rule, allRules, className, errMsgProvider) {
    var errors = [];
    var occurrences = (0,utils/* reduce */.u4)(allRules, function (result, curRule) {
        if (curRule.name === rule.name) {
            return result + 1;
        }
        return result;
    }, 0);
    if (occurrences > 1) {
        var errMsg = errMsgProvider.buildDuplicateRuleNameError({
            topLevelRule: rule,
            grammarName: className
        });
        errors.push({
            message: errMsg,
            type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
            ruleName: rule.name
        });
    }
    return errors;
}
// TODO: is there anyway to get only the rule names of rules inherited from the super grammars?
// This is not part of the IGrammarErrorProvider because the validation cannot be performed on
// The grammar structure, only at runtime.
function validateRuleIsOverridden(ruleName, definedRulesNames, className) {
    var errors = [];
    var errMsg;
    if (!utils/* contains */.r3(definedRulesNames, ruleName)) {
        errMsg =
            "Invalid rule override, rule: ->" + ruleName + "<- cannot be overridden in the grammar: ->" + className + "<-" +
                "as it is not defined in any of the super grammars ";
        errors.push({
            message: errMsg,
            type: ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,
            ruleName: ruleName
        });
    }
    return errors;
}
function validateNoLeftRecursion(topRule, currRule, errMsgProvider, path) {
    if (path === void 0) { path = []; }
    var errors = [];
    var nextNonTerminals = getFirstNoneTerminal(currRule.definition);
    if (utils/* isEmpty */.xb(nextNonTerminals)) {
        return [];
    }
    else {
        var ruleName = topRule.name;
        var foundLeftRecursion = utils/* contains */.r3(nextNonTerminals, topRule);
        if (foundLeftRecursion) {
            errors.push({
                message: errMsgProvider.buildLeftRecursionError({
                    topLevelRule: topRule,
                    leftRecursionPath: path
                }),
                type: ParserDefinitionErrorType.LEFT_RECURSION,
                ruleName: ruleName
            });
        }
        // we are only looking for cyclic paths leading back to the specific topRule
        // other cyclic paths are ignored, we still need this difference to avoid infinite loops...
        var validNextSteps = utils/* difference */.e5(nextNonTerminals, path.concat([topRule]));
        var errorsFromNextSteps = utils/* map */.UI(validNextSteps, function (currRefRule) {
            var newPath = utils/* cloneArr */.Qw(path);
            newPath.push(currRefRule);
            return validateNoLeftRecursion(topRule, currRefRule, errMsgProvider, newPath);
        });
        return errors.concat(utils/* flatten */.xH(errorsFromNextSteps));
    }
}
function getFirstNoneTerminal(definition) {
    var result = [];
    if (utils/* isEmpty */.xb(definition)) {
        return result;
    }
    var firstProd = utils/* first */.Ps(definition);
    /* istanbul ignore else */
    if (firstProd instanceof NonTerminal) {
        result.push(firstProd.referencedRule);
    }
    else if (firstProd instanceof Alternative ||
        firstProd instanceof Option ||
        firstProd instanceof RepetitionMandatory ||
        firstProd instanceof RepetitionMandatoryWithSeparator ||
        firstProd instanceof RepetitionWithSeparator ||
        firstProd instanceof Repetition) {
        result = result.concat(getFirstNoneTerminal(firstProd.definition));
    }
    else if (firstProd instanceof Alternation) {
        // each sub definition in alternation is a FLAT
        result = utils/* flatten */.xH(utils/* map */.UI(firstProd.definition, function (currSubDef) {
            return getFirstNoneTerminal(currSubDef.definition);
        }));
    }
    else if (firstProd instanceof Terminal) {
        // nothing to see, move along
    }
    else {
        throw Error("non exhaustive match");
    }
    var isFirstOptional = isOptionalProd(firstProd);
    var hasMore = definition.length > 1;
    if (isFirstOptional && hasMore) {
        var rest = utils/* drop */.Cw(definition);
        return result.concat(getFirstNoneTerminal(rest));
    }
    else {
        return result;
    }
}
var OrCollector = /** @class */ (function (_super) {
    checks_extends(OrCollector, _super);
    function OrCollector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.alternations = [];
        return _this;
    }
    OrCollector.prototype.visitAlternation = function (node) {
        this.alternations.push(node);
    };
    return OrCollector;
}(GAstVisitor));
function validateEmptyOrAlternative(topLevelRule, errMsgProvider) {
    var orCollector = new OrCollector();
    topLevelRule.accept(orCollector);
    var ors = orCollector.alternations;
    var errors = utils/* reduce */.u4(ors, function (errors, currOr) {
        var exceptLast = utils/* dropRight */.j7(currOr.definition);
        var currErrors = utils/* map */.UI(exceptLast, function (currAlternative, currAltIdx) {
            var possibleFirstInAlt = nextPossibleTokensAfter([currAlternative], [], null, 1);
            if (utils/* isEmpty */.xb(possibleFirstInAlt)) {
                return {
                    message: errMsgProvider.buildEmptyAlternationError({
                        topLevelRule: topLevelRule,
                        alternation: currOr,
                        emptyChoiceIdx: currAltIdx
                    }),
                    type: ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,
                    ruleName: topLevelRule.name,
                    occurrence: currOr.idx,
                    alternative: currAltIdx + 1
                };
            }
            else {
                return null;
            }
        });
        return errors.concat(utils/* compact */.oA(currErrors));
    }, []);
    return errors;
}
function validateAmbiguousAlternationAlternatives(topLevelRule, globalMaxLookahead, errMsgProvider) {
    var orCollector = new OrCollector();
    topLevelRule.accept(orCollector);
    var ors = orCollector.alternations;
    // New Handling of ignoring ambiguities
    // - https://github.com/SAP/chevrotain/issues/869
    ors = (0,utils/* reject */.d1)(ors, function (currOr) { return currOr.ignoreAmbiguities === true; });
    var errors = utils/* reduce */.u4(ors, function (result, currOr) {
        var currOccurrence = currOr.idx;
        var actualMaxLookahead = currOr.maxLookahead || globalMaxLookahead;
        var alternatives = getLookaheadPathsForOr(currOccurrence, topLevelRule, actualMaxLookahead, currOr);
        var altsAmbiguityErrors = checkAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
        var altsPrefixAmbiguityErrors = checkPrefixAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
        return result.concat(altsAmbiguityErrors, altsPrefixAmbiguityErrors);
    }, []);
    return errors;
}
var RepetionCollector = /** @class */ (function (_super) {
    checks_extends(RepetionCollector, _super);
    function RepetionCollector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.allProductions = [];
        return _this;
    }
    RepetionCollector.prototype.visitRepetitionWithSeparator = function (manySep) {
        this.allProductions.push(manySep);
    };
    RepetionCollector.prototype.visitRepetitionMandatory = function (atLeastOne) {
        this.allProductions.push(atLeastOne);
    };
    RepetionCollector.prototype.visitRepetitionMandatoryWithSeparator = function (atLeastOneSep) {
        this.allProductions.push(atLeastOneSep);
    };
    RepetionCollector.prototype.visitRepetition = function (many) {
        this.allProductions.push(many);
    };
    return RepetionCollector;
}(GAstVisitor));

function validateTooManyAlts(topLevelRule, errMsgProvider) {
    var orCollector = new OrCollector();
    topLevelRule.accept(orCollector);
    var ors = orCollector.alternations;
    var errors = utils/* reduce */.u4(ors, function (errors, currOr) {
        if (currOr.definition.length > 255) {
            errors.push({
                message: errMsgProvider.buildTooManyAlternativesError({
                    topLevelRule: topLevelRule,
                    alternation: currOr
                }),
                type: ParserDefinitionErrorType.TOO_MANY_ALTS,
                ruleName: topLevelRule.name,
                occurrence: currOr.idx
            });
        }
        return errors;
    }, []);
    return errors;
}
function validateSomeNonEmptyLookaheadPath(topLevelRules, maxLookahead, errMsgProvider) {
    var errors = [];
    (0,utils/* forEach */.Ed)(topLevelRules, function (currTopRule) {
        var collectorVisitor = new RepetionCollector();
        currTopRule.accept(collectorVisitor);
        var allRuleProductions = collectorVisitor.allProductions;
        (0,utils/* forEach */.Ed)(allRuleProductions, function (currProd) {
            var prodType = getProdType(currProd);
            var actualMaxLookahead = currProd.maxLookahead || maxLookahead;
            var currOccurrence = currProd.idx;
            var paths = getLookaheadPathsForOptionalProd(currOccurrence, currTopRule, prodType, actualMaxLookahead);
            var pathsInsideProduction = paths[0];
            if ((0,utils/* isEmpty */.xb)((0,utils/* flatten */.xH)(pathsInsideProduction))) {
                var errMsg = errMsgProvider.buildEmptyRepetitionError({
                    topLevelRule: currTopRule,
                    repetition: currProd
                });
                errors.push({
                    message: errMsg,
                    type: ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,
                    ruleName: currTopRule.name
                });
            }
        });
    });
    return errors;
}
function checkAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
    var foundAmbiguousPaths = [];
    var identicalAmbiguities = (0,utils/* reduce */.u4)(alternatives, function (result, currAlt, currAltIdx) {
        // ignore (skip) ambiguities with this alternative
        if (alternation.definition[currAltIdx].ignoreAmbiguities === true) {
            return result;
        }
        (0,utils/* forEach */.Ed)(currAlt, function (currPath) {
            var altsCurrPathAppearsIn = [currAltIdx];
            (0,utils/* forEach */.Ed)(alternatives, function (currOtherAlt, currOtherAltIdx) {
                if (currAltIdx !== currOtherAltIdx &&
                    containsPath(currOtherAlt, currPath) &&
                    // ignore (skip) ambiguities with this "other" alternative
                    alternation.definition[currOtherAltIdx].ignoreAmbiguities !== true) {
                    altsCurrPathAppearsIn.push(currOtherAltIdx);
                }
            });
            if (altsCurrPathAppearsIn.length > 1 &&
                !containsPath(foundAmbiguousPaths, currPath)) {
                foundAmbiguousPaths.push(currPath);
                result.push({
                    alts: altsCurrPathAppearsIn,
                    path: currPath
                });
            }
        });
        return result;
    }, []);
    var currErrors = utils/* map */.UI(identicalAmbiguities, function (currAmbDescriptor) {
        var ambgIndices = (0,utils/* map */.UI)(currAmbDescriptor.alts, function (currAltIdx) { return currAltIdx + 1; });
        var currMessage = errMsgProvider.buildAlternationAmbiguityError({
            topLevelRule: rule,
            alternation: alternation,
            ambiguityIndices: ambgIndices,
            prefixPath: currAmbDescriptor.path
        });
        return {
            message: currMessage,
            type: ParserDefinitionErrorType.AMBIGUOUS_ALTS,
            ruleName: rule.name,
            occurrence: alternation.idx,
            alternatives: [currAmbDescriptor.alts]
        };
    });
    return currErrors;
}
function checkPrefixAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
    var errors = [];
    // flatten
    var pathsAndIndices = (0,utils/* reduce */.u4)(alternatives, function (result, currAlt, idx) {
        var currPathsAndIdx = (0,utils/* map */.UI)(currAlt, function (currPath) {
            return { idx: idx, path: currPath };
        });
        return result.concat(currPathsAndIdx);
    }, []);
    (0,utils/* forEach */.Ed)(pathsAndIndices, function (currPathAndIdx) {
        var alternativeGast = alternation.definition[currPathAndIdx.idx];
        // ignore (skip) ambiguities with this alternative
        if (alternativeGast.ignoreAmbiguities === true) {
            return;
        }
        var targetIdx = currPathAndIdx.idx;
        var targetPath = currPathAndIdx.path;
        var prefixAmbiguitiesPathsAndIndices = (0,utils/* findAll */.Oq)(pathsAndIndices, function (searchPathAndIdx) {
            // prefix ambiguity can only be created from lower idx (higher priority) path
            return (
            // ignore (skip) ambiguities with this "other" alternative
            alternation.definition[searchPathAndIdx.idx].ignoreAmbiguities !==
                true &&
                searchPathAndIdx.idx < targetIdx &&
                // checking for strict prefix because identical lookaheads
                // will be be detected using a different validation.
                isStrictPrefixOfPath(searchPathAndIdx.path, targetPath));
        });
        var currPathPrefixErrors = (0,utils/* map */.UI)(prefixAmbiguitiesPathsAndIndices, function (currAmbPathAndIdx) {
            var ambgIndices = [currAmbPathAndIdx.idx + 1, targetIdx + 1];
            var occurrence = alternation.idx === 0 ? "" : alternation.idx;
            var message = errMsgProvider.buildAlternationPrefixAmbiguityError({
                topLevelRule: rule,
                alternation: alternation,
                ambiguityIndices: ambgIndices,
                prefixPath: currAmbPathAndIdx.path
            });
            return {
                message: message,
                type: ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,
                ruleName: rule.name,
                occurrence: occurrence,
                alternatives: ambgIndices
            };
        });
        errors = errors.concat(currPathPrefixErrors);
    });
    return errors;
}
function checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider) {
    var errors = [];
    var tokenNames = (0,utils/* map */.UI)(tokenTypes, function (currToken) { return currToken.name; });
    (0,utils/* forEach */.Ed)(topLevels, function (currRule) {
        var currRuleName = currRule.name;
        if ((0,utils/* contains */.r3)(tokenNames, currRuleName)) {
            var errMsg = errMsgProvider.buildNamespaceConflictError(currRule);
            errors.push({
                message: errMsg,
                type: ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,
                ruleName: currRuleName
            });
        }
    });
    return errors;
}
//# sourceMappingURL=checks.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/grammar/gast/gast_resolver_public.js





function gast_resolver_public_resolveGrammar(options) {
    options = (0,utils/* defaults */.ce)(options, {
        errMsgProvider: defaultGrammarResolverErrorProvider
    });
    var topRulesTable = {};
    (0,utils/* forEach */.Ed)(options.rules, function (rule) {
        topRulesTable[rule.name] = rule;
    });
    return resolveGrammar(topRulesTable, options.errMsgProvider);
}
function gast_resolver_public_validateGrammar(options) {
    options = (0,utils/* defaults */.ce)(options, {
        errMsgProvider: defaultGrammarValidatorErrorProvider
    });
    return validateGrammar(options.rules, options.maxLookahead, options.tokenTypes, options.errMsgProvider, options.grammarName);
}
function assignOccurrenceIndices(options) {
    (0,utils/* forEach */.Ed)(options.rules, function (currRule) {
        var methodsCollector = new DslMethodsCollectorVisitor();
        currRule.accept(methodsCollector);
        (0,utils/* forEach */.Ed)(methodsCollector.dslMethods, function (methods) {
            (0,utils/* forEach */.Ed)(methods, function (currMethod, arrIdx) {
                currMethod.idx = arrIdx + 1;
            });
        });
    });
}
//# sourceMappingURL=gast_resolver_public.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/exceptions_public.js
var exceptions_public_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var MISMATCHED_TOKEN_EXCEPTION = "MismatchedTokenException";
var NO_VIABLE_ALT_EXCEPTION = "NoViableAltException";
var EARLY_EXIT_EXCEPTION = "EarlyExitException";
var NOT_ALL_INPUT_PARSED_EXCEPTION = "NotAllInputParsedException";
var RECOGNITION_EXCEPTION_NAMES = [
    MISMATCHED_TOKEN_EXCEPTION,
    NO_VIABLE_ALT_EXCEPTION,
    EARLY_EXIT_EXCEPTION,
    NOT_ALL_INPUT_PARSED_EXCEPTION
];
Object.freeze(RECOGNITION_EXCEPTION_NAMES);
// hacks to bypass no support for custom Errors in javascript/typescript
function isRecognitionException(error) {
    // can't do instanceof on hacked custom js exceptions
    return (0,utils/* contains */.r3)(RECOGNITION_EXCEPTION_NAMES, error.name);
}
var RecognitionException = /** @class */ (function (_super) {
    exceptions_public_extends(RecognitionException, _super);
    function RecognitionException(message, token) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.token = token;
        _this.resyncedTokens = [];
        // fix prototype chain when typescript target is ES5
        Object.setPrototypeOf(_this, _newTarget.prototype);
        /* istanbul ignore next - V8 workaround to remove constructor from stacktrace when typescript target is ES5 */
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, _this.constructor);
        }
        return _this;
    }
    return RecognitionException;
}(Error));
var MismatchedTokenException = /** @class */ (function (_super) {
    exceptions_public_extends(MismatchedTokenException, _super);
    function MismatchedTokenException(message, token, previousToken) {
        var _this = _super.call(this, message, token) || this;
        _this.previousToken = previousToken;
        _this.name = MISMATCHED_TOKEN_EXCEPTION;
        return _this;
    }
    return MismatchedTokenException;
}(RecognitionException));

var NoViableAltException = /** @class */ (function (_super) {
    exceptions_public_extends(NoViableAltException, _super);
    function NoViableAltException(message, token, previousToken) {
        var _this = _super.call(this, message, token) || this;
        _this.previousToken = previousToken;
        _this.name = NO_VIABLE_ALT_EXCEPTION;
        return _this;
    }
    return NoViableAltException;
}(RecognitionException));

var NotAllInputParsedException = /** @class */ (function (_super) {
    exceptions_public_extends(NotAllInputParsedException, _super);
    function NotAllInputParsedException(message, token) {
        var _this = _super.call(this, message, token) || this;
        _this.name = NOT_ALL_INPUT_PARSED_EXCEPTION;
        return _this;
    }
    return NotAllInputParsedException;
}(RecognitionException));

var EarlyExitException = /** @class */ (function (_super) {
    exceptions_public_extends(EarlyExitException, _super);
    function EarlyExitException(message, token, previousToken) {
        var _this = _super.call(this, message, token) || this;
        _this.previousToken = previousToken;
        _this.name = EARLY_EXIT_EXCEPTION;
        return _this;
    }
    return EarlyExitException;
}(RecognitionException));

//# sourceMappingURL=exceptions_public.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/parser/traits/recoverable.js





var EOF_FOLLOW_KEY = {};
var IN_RULE_RECOVERY_EXCEPTION = "InRuleRecoveryException";
function InRuleRecoveryException(message) {
    this.name = IN_RULE_RECOVERY_EXCEPTION;
    this.message = message;
}
InRuleRecoveryException.prototype = Error.prototype;
/**
 * This trait is responsible for the error recovery and fault tolerant logic
 */
var Recoverable = /** @class */ (function () {
    function Recoverable() {
    }
    Recoverable.prototype.initRecoverable = function (config) {
        this.firstAfterRepMap = {};
        this.resyncFollows = {};
        this.recoveryEnabled = (0,utils/* has */.e$)(config, "recoveryEnabled")
            ? config.recoveryEnabled
            : DEFAULT_PARSER_CONFIG.recoveryEnabled;
        // performance optimization, NOOP will be inlined which
        // effectively means that this optional feature does not exist
        // when not used.
        if (this.recoveryEnabled) {
            this.attemptInRepetitionRecovery = attemptInRepetitionRecovery;
        }
    };
    Recoverable.prototype.getTokenToInsert = function (tokType) {
        var tokToInsert = createTokenInstance(tokType, "", NaN, NaN, NaN, NaN, NaN, NaN);
        tokToInsert.isInsertedInRecovery = true;
        return tokToInsert;
    };
    Recoverable.prototype.canTokenTypeBeInsertedInRecovery = function (tokType) {
        return true;
    };
    Recoverable.prototype.tryInRepetitionRecovery = function (grammarRule, grammarRuleArgs, lookAheadFunc, expectedTokType) {
        var _this = this;
        // TODO: can the resyncTokenType be cached?
        var reSyncTokType = this.findReSyncTokenType();
        var savedLexerState = this.exportLexerState();
        var resyncedTokens = [];
        var passedResyncPoint = false;
        var nextTokenWithoutResync = this.LA(1);
        var currToken = this.LA(1);
        var generateErrorMessage = function () {
            var previousToken = _this.LA(0);
            // we are preemptively re-syncing before an error has been detected, therefor we must reproduce
            // the error that would have been thrown
            var msg = _this.errorMessageProvider.buildMismatchTokenMessage({
                expected: expectedTokType,
                actual: nextTokenWithoutResync,
                previous: previousToken,
                ruleName: _this.getCurrRuleFullName()
            });
            var error = new MismatchedTokenException(msg, nextTokenWithoutResync, _this.LA(0));
            // the first token here will be the original cause of the error, this is not part of the resyncedTokens property.
            error.resyncedTokens = (0,utils/* dropRight */.j7)(resyncedTokens);
            _this.SAVE_ERROR(error);
        };
        while (!passedResyncPoint) {
            // re-synced to a point where we can safely exit the repetition/
            if (this.tokenMatcher(currToken, expectedTokType)) {
                generateErrorMessage();
                return; // must return here to avoid reverting the inputIdx
            }
            else if (lookAheadFunc.call(this)) {
                // we skipped enough tokens so we can resync right back into another iteration of the repetition grammar rule
                generateErrorMessage();
                // recursive invocation in other to support multiple re-syncs in the same top level repetition grammar rule
                grammarRule.apply(this, grammarRuleArgs);
                return; // must return here to avoid reverting the inputIdx
            }
            else if (this.tokenMatcher(currToken, reSyncTokType)) {
                passedResyncPoint = true;
            }
            else {
                currToken = this.SKIP_TOKEN();
                this.addToResyncTokens(currToken, resyncedTokens);
            }
        }
        // we were unable to find a CLOSER point to resync inside the Repetition, reset the state.
        // The parsing exception we were trying to prevent will happen in the NEXT parsing step. it may be handled by
        // "between rules" resync recovery later in the flow.
        this.importLexerState(savedLexerState);
    };
    Recoverable.prototype.shouldInRepetitionRecoveryBeTried = function (expectTokAfterLastMatch, nextTokIdx, notStuck) {
        // Edge case of arriving from a MANY repetition which is stuck
        // Attempting recovery in this case could cause an infinite loop
        if (notStuck === false) {
            return false;
        }
        // arguments to try and perform resync into the next iteration of the many are missing
        if (expectTokAfterLastMatch === undefined || nextTokIdx === undefined) {
            return false;
        }
        // no need to recover, next token is what we expect...
        if (this.tokenMatcher(this.LA(1), expectTokAfterLastMatch)) {
            return false;
        }
        // error recovery is disabled during backtracking as it can make the parser ignore a valid grammar path
        // and prefer some backtracking path that includes recovered errors.
        if (this.isBackTracking()) {
            return false;
        }
        // if we can perform inRule recovery (single token insertion or deletion) we always prefer that recovery algorithm
        // because if it works, it makes the least amount of changes to the input stream (greedy algorithm)
        //noinspection RedundantIfStatementJS
        if (this.canPerformInRuleRecovery(expectTokAfterLastMatch, this.getFollowsForInRuleRecovery(expectTokAfterLastMatch, nextTokIdx))) {
            return false;
        }
        return true;
    };
    // Error Recovery functionality
    Recoverable.prototype.getFollowsForInRuleRecovery = function (tokType, tokIdxInRule) {
        var grammarPath = this.getCurrentGrammarPath(tokType, tokIdxInRule);
        var follows = this.getNextPossibleTokenTypes(grammarPath);
        return follows;
    };
    Recoverable.prototype.tryInRuleRecovery = function (expectedTokType, follows) {
        if (this.canRecoverWithSingleTokenInsertion(expectedTokType, follows)) {
            var tokToInsert = this.getTokenToInsert(expectedTokType);
            return tokToInsert;
        }
        if (this.canRecoverWithSingleTokenDeletion(expectedTokType)) {
            var nextTok = this.SKIP_TOKEN();
            this.consumeToken();
            return nextTok;
        }
        throw new InRuleRecoveryException("sad sad panda");
    };
    Recoverable.prototype.canPerformInRuleRecovery = function (expectedToken, follows) {
        return (this.canRecoverWithSingleTokenInsertion(expectedToken, follows) ||
            this.canRecoverWithSingleTokenDeletion(expectedToken));
    };
    Recoverable.prototype.canRecoverWithSingleTokenInsertion = function (expectedTokType, follows) {
        var _this = this;
        if (!this.canTokenTypeBeInsertedInRecovery(expectedTokType)) {
            return false;
        }
        // must know the possible following tokens to perform single token insertion
        if ((0,utils/* isEmpty */.xb)(follows)) {
            return false;
        }
        var mismatchedTok = this.LA(1);
        var isMisMatchedTokInFollows = (0,utils/* find */.sE)(follows, function (possibleFollowsTokType) {
            return _this.tokenMatcher(mismatchedTok, possibleFollowsTokType);
        }) !== undefined;
        return isMisMatchedTokInFollows;
    };
    Recoverable.prototype.canRecoverWithSingleTokenDeletion = function (expectedTokType) {
        var isNextTokenWhatIsExpected = this.tokenMatcher(this.LA(2), expectedTokType);
        return isNextTokenWhatIsExpected;
    };
    Recoverable.prototype.isInCurrentRuleReSyncSet = function (tokenTypeIdx) {
        var followKey = this.getCurrFollowKey();
        var currentRuleReSyncSet = this.getFollowSetFromFollowKey(followKey);
        return (0,utils/* contains */.r3)(currentRuleReSyncSet, tokenTypeIdx);
    };
    Recoverable.prototype.findReSyncTokenType = function () {
        var allPossibleReSyncTokTypes = this.flattenFollowSet();
        // this loop will always terminate as EOF is always in the follow stack and also always (virtually) in the input
        var nextToken = this.LA(1);
        var k = 2;
        while (true) {
            var nextTokenType = nextToken.tokenType;
            if ((0,utils/* contains */.r3)(allPossibleReSyncTokTypes, nextTokenType)) {
                return nextTokenType;
            }
            nextToken = this.LA(k);
            k++;
        }
    };
    Recoverable.prototype.getCurrFollowKey = function () {
        // the length is at least one as we always add the ruleName to the stack before invoking the rule.
        if (this.RULE_STACK.length === 1) {
            return EOF_FOLLOW_KEY;
        }
        var currRuleShortName = this.getLastExplicitRuleShortName();
        var currRuleIdx = this.getLastExplicitRuleOccurrenceIndex();
        var prevRuleShortName = this.getPreviousExplicitRuleShortName();
        return {
            ruleName: this.shortRuleNameToFullName(currRuleShortName),
            idxInCallingRule: currRuleIdx,
            inRule: this.shortRuleNameToFullName(prevRuleShortName)
        };
    };
    Recoverable.prototype.buildFullFollowKeyStack = function () {
        var _this = this;
        var explicitRuleStack = this.RULE_STACK;
        var explicitOccurrenceStack = this.RULE_OCCURRENCE_STACK;
        return (0,utils/* map */.UI)(explicitRuleStack, function (ruleName, idx) {
            if (idx === 0) {
                return EOF_FOLLOW_KEY;
            }
            return {
                ruleName: _this.shortRuleNameToFullName(ruleName),
                idxInCallingRule: explicitOccurrenceStack[idx],
                inRule: _this.shortRuleNameToFullName(explicitRuleStack[idx - 1])
            };
        });
    };
    Recoverable.prototype.flattenFollowSet = function () {
        var _this = this;
        var followStack = (0,utils/* map */.UI)(this.buildFullFollowKeyStack(), function (currKey) {
            return _this.getFollowSetFromFollowKey(currKey);
        });
        return (0,utils/* flatten */.xH)(followStack);
    };
    Recoverable.prototype.getFollowSetFromFollowKey = function (followKey) {
        if (followKey === EOF_FOLLOW_KEY) {
            return [EOF];
        }
        var followName = followKey.ruleName + followKey.idxInCallingRule + constants_IN + followKey.inRule;
        return this.resyncFollows[followName];
    };
    // It does not make any sense to include a virtual EOF token in the list of resynced tokens
    // as EOF does not really exist and thus does not contain any useful information (line/column numbers)
    Recoverable.prototype.addToResyncTokens = function (token, resyncTokens) {
        if (!this.tokenMatcher(token, EOF)) {
            resyncTokens.push(token);
        }
        return resyncTokens;
    };
    Recoverable.prototype.reSyncTo = function (tokType) {
        var resyncedTokens = [];
        var nextTok = this.LA(1);
        while (this.tokenMatcher(nextTok, tokType) === false) {
            nextTok = this.SKIP_TOKEN();
            this.addToResyncTokens(nextTok, resyncedTokens);
        }
        // the last token is not part of the error.
        return (0,utils/* dropRight */.j7)(resyncedTokens);
    };
    Recoverable.prototype.attemptInRepetitionRecovery = function (prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
        // by default this is a NO-OP
        // The actual implementation is with the function(not method) below
    };
    Recoverable.prototype.getCurrentGrammarPath = function (tokType, tokIdxInRule) {
        var pathRuleStack = this.getHumanReadableRuleStack();
        var pathOccurrenceStack = (0,utils/* cloneArr */.Qw)(this.RULE_OCCURRENCE_STACK);
        var grammarPath = {
            ruleStack: pathRuleStack,
            occurrenceStack: pathOccurrenceStack,
            lastTok: tokType,
            lastTokOccurrence: tokIdxInRule
        };
        return grammarPath;
    };
    Recoverable.prototype.getHumanReadableRuleStack = function () {
        var _this = this;
        return (0,utils/* map */.UI)(this.RULE_STACK, function (currShortName) {
            return _this.shortRuleNameToFullName(currShortName);
        });
    };
    return Recoverable;
}());

function attemptInRepetitionRecovery(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
    var key = this.getKeyForAutomaticLookahead(dslMethodIdx, prodOccurrence);
    var firstAfterRepInfo = this.firstAfterRepMap[key];
    if (firstAfterRepInfo === undefined) {
        var currRuleName = this.getCurrRuleFullName();
        var ruleGrammar = this.getGAstProductions()[currRuleName];
        var walker = new nextToksWalker(ruleGrammar, prodOccurrence);
        firstAfterRepInfo = walker.startWalking();
        this.firstAfterRepMap[key] = firstAfterRepInfo;
    }
    var expectTokAfterLastMatch = firstAfterRepInfo.token;
    var nextTokIdx = firstAfterRepInfo.occurrence;
    var isEndOfRule = firstAfterRepInfo.isEndOfRule;
    // special edge case of a TOP most repetition after which the input should END.
    // this will force an attempt for inRule recovery in that scenario.
    if (this.RULE_STACK.length === 1 &&
        isEndOfRule &&
        expectTokAfterLastMatch === undefined) {
        expectTokAfterLastMatch = EOF;
        nextTokIdx = 1;
    }
    if (this.shouldInRepetitionRecoveryBeTried(expectTokAfterLastMatch, nextTokIdx, notStuck)) {
        // TODO: performance optimization: instead of passing the original args here, we modify
        // the args param (or create a new one) and make sure the lookahead func is explicitly provided
        // to avoid searching the cache for it once more.
        this.tryInRepetitionRecovery(prodFunc, args, lookaheadFunc, expectTokAfterLastMatch);
    }
}
//# sourceMappingURL=recoverable.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/grammar/keys.js
// Lookahead keys are 32Bit integers in the form
// TTTTTTTT-ZZZZZZZZZZZZ-YYYY-XXXXXXXX
// XXXX -> Occurrence Index bitmap.
// YYYY -> DSL Method Type bitmap.
// ZZZZZZZZZZZZZZZ -> Rule short Index bitmap.
// TTTTTTTTT -> alternation alternative index bitmap
var BITS_FOR_METHOD_TYPE = 4;
var BITS_FOR_OCCURRENCE_IDX = 8;
var BITS_FOR_RULE_IDX = 12;
// TODO: validation, this means that there may at most 2^8 --> 256 alternatives for an alternation.
var BITS_FOR_ALT_IDX = 8;
// short string used as part of mapping keys.
// being short improves the performance when composing KEYS for maps out of these
// The 5 - 8 bits (16 possible values, are reserved for the DSL method indices)
/* tslint:disable */
var OR_IDX = 1 << BITS_FOR_OCCURRENCE_IDX;
var OPTION_IDX = 2 << BITS_FOR_OCCURRENCE_IDX;
var MANY_IDX = 3 << BITS_FOR_OCCURRENCE_IDX;
var AT_LEAST_ONE_IDX = 4 << BITS_FOR_OCCURRENCE_IDX;
var MANY_SEP_IDX = 5 << BITS_FOR_OCCURRENCE_IDX;
var AT_LEAST_ONE_SEP_IDX = 6 << BITS_FOR_OCCURRENCE_IDX;
/* tslint:enable */
// this actually returns a number, but it is always used as a string (object prop key)
function getKeyForAutomaticLookahead(ruleIdx, dslMethodIdx, occurrence) {
    /* tslint:disable */
    return occurrence | dslMethodIdx | ruleIdx;
    /* tslint:enable */
}
var BITS_START_FOR_ALT_IDX = 32 - BITS_FOR_ALT_IDX;
//# sourceMappingURL=keys.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/parser/traits/looksahead.js





/**
 * Trait responsible for the lookahead related utilities and optimizations.
 */
var LooksAhead = /** @class */ (function () {
    function LooksAhead() {
    }
    LooksAhead.prototype.initLooksAhead = function (config) {
        this.dynamicTokensEnabled = (0,utils/* has */.e$)(config, "dynamicTokensEnabled")
            ? config.dynamicTokensEnabled
            : DEFAULT_PARSER_CONFIG.dynamicTokensEnabled;
        this.maxLookahead = (0,utils/* has */.e$)(config, "maxLookahead")
            ? config.maxLookahead
            : DEFAULT_PARSER_CONFIG.maxLookahead;
        /* istanbul ignore next - Using plain array as dictionary will be tested on older node.js versions and IE11 */
        this.lookAheadFuncsCache = (0,utils/* isES2015MapSupported */.dU)() ? new Map() : [];
        // Performance optimization on newer engines that support ES6 Map
        // For larger Maps this is slightly faster than using a plain object (array in our case).
        /* istanbul ignore else - The else branch will be tested on older node.js versions and IE11 */
        if ((0,utils/* isES2015MapSupported */.dU)()) {
            this.getLaFuncFromCache = this.getLaFuncFromMap;
            this.setLaFuncCache = this.setLaFuncCacheUsingMap;
        }
        else {
            this.getLaFuncFromCache = this.getLaFuncFromObj;
            this.setLaFuncCache = this.setLaFuncUsingObj;
        }
    };
    LooksAhead.prototype.preComputeLookaheadFunctions = function (rules) {
        var _this = this;
        (0,utils/* forEach */.Ed)(rules, function (currRule) {
            _this.TRACE_INIT(currRule.name + " Rule Lookahead", function () {
                var _a = collectMethods(currRule), alternation = _a.alternation, repetition = _a.repetition, option = _a.option, repetitionMandatory = _a.repetitionMandatory, repetitionMandatoryWithSeparator = _a.repetitionMandatoryWithSeparator, repetitionWithSeparator = _a.repetitionWithSeparator;
                (0,utils/* forEach */.Ed)(alternation, function (currProd) {
                    var prodIdx = currProd.idx === 0 ? "" : currProd.idx;
                    _this.TRACE_INIT("" + getProductionDslName(currProd) + prodIdx, function () {
                        var laFunc = buildLookaheadFuncForOr(currProd.idx, currRule, currProd.maxLookahead || _this.maxLookahead, currProd.hasPredicates, _this.dynamicTokensEnabled, _this.lookAheadBuilderForAlternatives);
                        var key = getKeyForAutomaticLookahead(_this.fullRuleNameToShort[currRule.name], OR_IDX, currProd.idx);
                        _this.setLaFuncCache(key, laFunc);
                    });
                });
                (0,utils/* forEach */.Ed)(repetition, function (currProd) {
                    _this.computeLookaheadFunc(currRule, currProd.idx, MANY_IDX, PROD_TYPE.REPETITION, currProd.maxLookahead, getProductionDslName(currProd));
                });
                (0,utils/* forEach */.Ed)(option, function (currProd) {
                    _this.computeLookaheadFunc(currRule, currProd.idx, OPTION_IDX, PROD_TYPE.OPTION, currProd.maxLookahead, getProductionDslName(currProd));
                });
                (0,utils/* forEach */.Ed)(repetitionMandatory, function (currProd) {
                    _this.computeLookaheadFunc(currRule, currProd.idx, AT_LEAST_ONE_IDX, PROD_TYPE.REPETITION_MANDATORY, currProd.maxLookahead, getProductionDslName(currProd));
                });
                (0,utils/* forEach */.Ed)(repetitionMandatoryWithSeparator, function (currProd) {
                    _this.computeLookaheadFunc(currRule, currProd.idx, AT_LEAST_ONE_SEP_IDX, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currProd.maxLookahead, getProductionDslName(currProd));
                });
                (0,utils/* forEach */.Ed)(repetitionWithSeparator, function (currProd) {
                    _this.computeLookaheadFunc(currRule, currProd.idx, MANY_SEP_IDX, PROD_TYPE.REPETITION_WITH_SEPARATOR, currProd.maxLookahead, getProductionDslName(currProd));
                });
            });
        });
    };
    LooksAhead.prototype.computeLookaheadFunc = function (rule, prodOccurrence, prodKey, prodType, prodMaxLookahead, dslMethodName) {
        var _this = this;
        this.TRACE_INIT("" + dslMethodName + (prodOccurrence === 0 ? "" : prodOccurrence), function () {
            var laFunc = buildLookaheadFuncForOptionalProd(prodOccurrence, rule, prodMaxLookahead || _this.maxLookahead, _this.dynamicTokensEnabled, prodType, _this.lookAheadBuilderForOptional);
            var key = getKeyForAutomaticLookahead(_this.fullRuleNameToShort[rule.name], prodKey, prodOccurrence);
            _this.setLaFuncCache(key, laFunc);
        });
    };
    LooksAhead.prototype.lookAheadBuilderForOptional = function (alt, tokenMatcher, dynamicTokensEnabled) {
        return buildSingleAlternativeLookaheadFunction(alt, tokenMatcher, dynamicTokensEnabled);
    };
    LooksAhead.prototype.lookAheadBuilderForAlternatives = function (alts, hasPredicates, tokenMatcher, dynamicTokensEnabled) {
        return buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher, dynamicTokensEnabled);
    };
    // this actually returns a number, but it is always used as a string (object prop key)
    LooksAhead.prototype.getKeyForAutomaticLookahead = function (dslMethodIdx, occurrence) {
        var currRuleShortName = this.getLastExplicitRuleShortName();
        return getKeyForAutomaticLookahead(currRuleShortName, dslMethodIdx, occurrence);
    };
    /* istanbul ignore next */
    LooksAhead.prototype.getLaFuncFromCache = function (key) {
        return undefined;
    };
    LooksAhead.prototype.getLaFuncFromMap = function (key) {
        return this.lookAheadFuncsCache.get(key);
    };
    /* istanbul ignore next - Using plain array as dictionary will be tested on older node.js versions and IE11 */
    LooksAhead.prototype.getLaFuncFromObj = function (key) {
        return this.lookAheadFuncsCache[key];
    };
    /* istanbul ignore next */
    LooksAhead.prototype.setLaFuncCache = function (key, value) { };
    LooksAhead.prototype.setLaFuncCacheUsingMap = function (key, value) {
        this.lookAheadFuncsCache.set(key, value);
    };
    /* istanbul ignore next - Using plain array as dictionary will be tested on older node.js versions and IE11 */
    LooksAhead.prototype.setLaFuncUsingObj = function (key, value) {
        this.lookAheadFuncsCache[key] = value;
    };
    return LooksAhead;
}());

//# sourceMappingURL=looksahead.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/cst/cst.js
/**
 * This nodeLocation tracking is not efficient and should only be used
 * when error recovery is enabled or the Token Vector contains virtual Tokens
 * (e.g, Python Indent/Outdent)
 * As it executes the calculation for every single terminal/nonTerminal
 * and does not rely on the fact the token vector is **sorted**
 */
function setNodeLocationOnlyOffset(currNodeLocation, newLocationInfo) {
    // First (valid) update for this cst node
    if (isNaN(currNodeLocation.startOffset) === true) {
        // assumption1: Token location information is either NaN or a valid number
        // assumption2: Token location information is fully valid if it exist
        // (both start/end offsets exist and are numbers).
        currNodeLocation.startOffset = newLocationInfo.startOffset;
        currNodeLocation.endOffset = newLocationInfo.endOffset;
    }
    // Once the startOffset has been updated with a valid number it should never receive
    // any farther updates as the Token vector is sorted.
    // We still have to check this this condition for every new possible location info
    // because with error recovery enabled we may encounter invalid tokens (NaN location props)
    else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
        currNodeLocation.endOffset = newLocationInfo.endOffset;
    }
}
/**
 * This nodeLocation tracking is not efficient and should only be used
 * when error recovery is enabled or the Token Vector contains virtual Tokens
 * (e.g, Python Indent/Outdent)
 * As it executes the calculation for every single terminal/nonTerminal
 * and does not rely on the fact the token vector is **sorted**
 */
function setNodeLocationFull(currNodeLocation, newLocationInfo) {
    // First (valid) update for this cst node
    if (isNaN(currNodeLocation.startOffset) === true) {
        // assumption1: Token location information is either NaN or a valid number
        // assumption2: Token location information is fully valid if it exist
        // (all start/end props exist and are numbers).
        currNodeLocation.startOffset = newLocationInfo.startOffset;
        currNodeLocation.startColumn = newLocationInfo.startColumn;
        currNodeLocation.startLine = newLocationInfo.startLine;
        currNodeLocation.endOffset = newLocationInfo.endOffset;
        currNodeLocation.endColumn = newLocationInfo.endColumn;
        currNodeLocation.endLine = newLocationInfo.endLine;
    }
    // Once the start props has been updated with a valid number it should never receive
    // any farther updates as the Token vector is sorted.
    // We still have to check this this condition for every new possible location info
    // because with error recovery enabled we may encounter invalid tokens (NaN location props)
    else if (currNodeLocation.endOffset < newLocationInfo.endOffset === true) {
        currNodeLocation.endOffset = newLocationInfo.endOffset;
        currNodeLocation.endColumn = newLocationInfo.endColumn;
        currNodeLocation.endLine = newLocationInfo.endLine;
    }
}
function addTerminalToCst(node, token, tokenTypeName) {
    if (node.children[tokenTypeName] === undefined) {
        node.children[tokenTypeName] = [token];
    }
    else {
        node.children[tokenTypeName].push(token);
    }
}
function addNoneTerminalToCst(node, ruleName, ruleResult) {
    if (node.children[ruleName] === undefined) {
        node.children[ruleName] = [ruleResult];
    }
    else {
        node.children[ruleName].push(ruleResult);
    }
}
//# sourceMappingURL=cst.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/lang/lang_extensions.js

function classNameFromInstance(instance) {
    return functionName(instance.constructor);
}
var NAME = "name";
/**
 * Utility to obtain Function names.
 * Note that there should not be an assumptions on the result of this function.
 * E.g: When running from minified source code the result may be auto generated.
 */
function functionName(func) {
    // Engines that support Function.prototype.name OR the nth (n>1) time after
    // the name has been computed in the following else block.
    var existingNameProp = func.name;
    /* istanbul ignore else - too many hacks for IE/old versions of node.js here*/
    if (existingNameProp) {
        return existingNameProp;
    }
    else {
        return "anonymous";
    }
}
/**
 * @returns {boolean} - has the property been successfully defined
 */
function defineNameProp(obj, nameValue) {
    var namePropDescriptor = Object.getOwnPropertyDescriptor(obj, NAME);
    /* istanbul ignore else -> will only run in old versions of node.js */
    if ((0,utils/* isUndefined */.o8)(namePropDescriptor) || namePropDescriptor.configurable) {
        Object.defineProperty(obj, NAME, {
            enumerable: false,
            configurable: true,
            writable: false,
            value: nameValue
        });
        return true;
    }
    /* istanbul ignore next -> will only run in old versions of node.js */
    return false;
}
//# sourceMappingURL=lang_extensions.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/cst/cst_visitor.js


function defaultVisit(ctx, param) {
    var childrenNames = (0,utils/* keys */.XP)(ctx);
    var childrenNamesLength = childrenNames.length;
    for (var i = 0; i < childrenNamesLength; i++) {
        var currChildName = childrenNames[i];
        var currChildArray = ctx[currChildName];
        var currChildArrayLength = currChildArray.length;
        for (var j = 0; j < currChildArrayLength; j++) {
            var currChild = currChildArray[j];
            // distinction between Tokens Children and CstNode children
            if (currChild.tokenTypeIdx === undefined) {
                this[currChild.name](currChild.children, param);
            }
        }
    }
    // defaultVisit does not support generic out param
    return undefined;
}
function createBaseSemanticVisitorConstructor(grammarName, ruleNames) {
    var derivedConstructor = function () { };
    // can be overwritten according to:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/
    // name?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FFunction%2Fname
    defineNameProp(derivedConstructor, grammarName + "BaseSemantics");
    var semanticProto = {
        visit: function (cstNode, param) {
            // enables writing more concise visitor methods when CstNode has only a single child
            if ((0,utils/* isArray */.kJ)(cstNode)) {
                // A CST Node's children dictionary can never have empty arrays as values
                // If a key is defined there will be at least one element in the corresponding value array.
                cstNode = cstNode[0];
            }
            // enables passing optional CstNodes concisely.
            if ((0,utils/* isUndefined */.o8)(cstNode)) {
                return undefined;
            }
            return this[cstNode.name](cstNode.children, param);
        },
        validateVisitor: function () {
            var semanticDefinitionErrors = validateVisitor(this, ruleNames);
            if (!(0,utils/* isEmpty */.xb)(semanticDefinitionErrors)) {
                var errorMessages = (0,utils/* map */.UI)(semanticDefinitionErrors, function (currDefError) { return currDefError.msg; });
                throw Error("Errors Detected in CST Visitor <" + functionName(this.constructor) + ">:\n\t" + ("" + errorMessages.join("\n\n").replace(/\n/g, "\n\t")));
            }
        }
    };
    derivedConstructor.prototype = semanticProto;
    derivedConstructor.prototype.constructor = derivedConstructor;
    derivedConstructor._RULE_NAMES = ruleNames;
    return derivedConstructor;
}
function createBaseVisitorConstructorWithDefaults(grammarName, ruleNames, baseConstructor) {
    var derivedConstructor = function () { };
    // can be overwritten according to:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/
    // name?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FFunction%2Fname
    defineNameProp(derivedConstructor, grammarName + "BaseSemanticsWithDefaults");
    var withDefaultsProto = Object.create(baseConstructor.prototype);
    (0,utils/* forEach */.Ed)(ruleNames, function (ruleName) {
        withDefaultsProto[ruleName] = defaultVisit;
    });
    derivedConstructor.prototype = withDefaultsProto;
    derivedConstructor.prototype.constructor = derivedConstructor;
    return derivedConstructor;
}
var CstVisitorDefinitionError;
(function (CstVisitorDefinitionError) {
    CstVisitorDefinitionError[CstVisitorDefinitionError["REDUNDANT_METHOD"] = 0] = "REDUNDANT_METHOD";
    CstVisitorDefinitionError[CstVisitorDefinitionError["MISSING_METHOD"] = 1] = "MISSING_METHOD";
})(CstVisitorDefinitionError || (CstVisitorDefinitionError = {}));
function validateVisitor(visitorInstance, ruleNames) {
    var missingErrors = validateMissingCstMethods(visitorInstance, ruleNames);
    var redundantErrors = validateRedundantMethods(visitorInstance, ruleNames);
    return missingErrors.concat(redundantErrors);
}
function validateMissingCstMethods(visitorInstance, ruleNames) {
    var errors = (0,utils/* map */.UI)(ruleNames, function (currRuleName) {
        if (!(0,utils/* isFunction */.mf)(visitorInstance[currRuleName])) {
            return {
                msg: "Missing visitor method: <" + currRuleName + "> on " + functionName(visitorInstance.constructor) + " CST Visitor.",
                type: CstVisitorDefinitionError.MISSING_METHOD,
                methodName: currRuleName
            };
        }
    });
    return (0,utils/* compact */.oA)(errors);
}
var VALID_PROP_NAMES = ["constructor", "visit", "validateVisitor"];
function validateRedundantMethods(visitorInstance, ruleNames) {
    var errors = [];
    for (var prop in visitorInstance) {
        if ((0,utils/* isFunction */.mf)(visitorInstance[prop]) &&
            !(0,utils/* contains */.r3)(VALID_PROP_NAMES, prop) &&
            !(0,utils/* contains */.r3)(ruleNames, prop)) {
            errors.push({
                msg: "Redundant visitor method: <" + prop + "> on " + functionName(visitorInstance.constructor) + " CST Visitor\n" +
                    "There is no Grammar Rule corresponding to this method's name.\n",
                type: CstVisitorDefinitionError.REDUNDANT_METHOD,
                methodName: prop
            });
        }
    }
    return errors;
}
//# sourceMappingURL=cst_visitor.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/parser/traits/tree_builder.js




/**
 * This trait is responsible for the CST building logic.
 */
var TreeBuilder = /** @class */ (function () {
    function TreeBuilder() {
    }
    TreeBuilder.prototype.initTreeBuilder = function (config) {
        this.CST_STACK = [];
        // outputCst is no longer exposed/defined in the pubic API
        this.outputCst = config.outputCst;
        this.nodeLocationTracking = (0,utils/* has */.e$)(config, "nodeLocationTracking")
            ? config.nodeLocationTracking
            : DEFAULT_PARSER_CONFIG.nodeLocationTracking;
        if (!this.outputCst) {
            this.cstInvocationStateUpdate = utils/* NOOP */.dG;
            this.cstFinallyStateUpdate = utils/* NOOP */.dG;
            this.cstPostTerminal = utils/* NOOP */.dG;
            this.cstPostNonTerminal = utils/* NOOP */.dG;
            this.cstPostRule = utils/* NOOP */.dG;
        }
        else {
            if (/full/i.test(this.nodeLocationTracking)) {
                if (this.recoveryEnabled) {
                    this.setNodeLocationFromToken = setNodeLocationFull;
                    this.setNodeLocationFromNode = setNodeLocationFull;
                    this.cstPostRule = utils/* NOOP */.dG;
                    this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery;
                }
                else {
                    this.setNodeLocationFromToken = utils/* NOOP */.dG;
                    this.setNodeLocationFromNode = utils/* NOOP */.dG;
                    this.cstPostRule = this.cstPostRuleFull;
                    this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular;
                }
            }
            else if (/onlyOffset/i.test(this.nodeLocationTracking)) {
                if (this.recoveryEnabled) {
                    this.setNodeLocationFromToken = setNodeLocationOnlyOffset;
                    this.setNodeLocationFromNode = setNodeLocationOnlyOffset;
                    this.cstPostRule = utils/* NOOP */.dG;
                    this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery;
                }
                else {
                    this.setNodeLocationFromToken = utils/* NOOP */.dG;
                    this.setNodeLocationFromNode = utils/* NOOP */.dG;
                    this.cstPostRule = this.cstPostRuleOnlyOffset;
                    this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular;
                }
            }
            else if (/none/i.test(this.nodeLocationTracking)) {
                this.setNodeLocationFromToken = utils/* NOOP */.dG;
                this.setNodeLocationFromNode = utils/* NOOP */.dG;
                this.cstPostRule = utils/* NOOP */.dG;
                this.setInitialNodeLocation = utils/* NOOP */.dG;
            }
            else {
                throw Error("Invalid <nodeLocationTracking> config option: \"" + config.nodeLocationTracking + "\"");
            }
        }
    };
    TreeBuilder.prototype.setInitialNodeLocationOnlyOffsetRecovery = function (cstNode) {
        cstNode.location = {
            startOffset: NaN,
            endOffset: NaN
        };
    };
    TreeBuilder.prototype.setInitialNodeLocationOnlyOffsetRegular = function (cstNode) {
        cstNode.location = {
            // without error recovery the starting Location of a new CstNode is guaranteed
            // To be the next Token's startOffset (for valid inputs).
            // For invalid inputs there won't be any CSTOutput so this potential
            // inaccuracy does not matter
            startOffset: this.LA(1).startOffset,
            endOffset: NaN
        };
    };
    TreeBuilder.prototype.setInitialNodeLocationFullRecovery = function (cstNode) {
        cstNode.location = {
            startOffset: NaN,
            startLine: NaN,
            startColumn: NaN,
            endOffset: NaN,
            endLine: NaN,
            endColumn: NaN
        };
    };
    /**
       *  @see setInitialNodeLocationOnlyOffsetRegular for explanation why this work
  
       * @param cstNode
       */
    TreeBuilder.prototype.setInitialNodeLocationFullRegular = function (cstNode) {
        var nextToken = this.LA(1);
        cstNode.location = {
            startOffset: nextToken.startOffset,
            startLine: nextToken.startLine,
            startColumn: nextToken.startColumn,
            endOffset: NaN,
            endLine: NaN,
            endColumn: NaN
        };
    };
    TreeBuilder.prototype.cstInvocationStateUpdate = function (fullRuleName, shortName) {
        var cstNode = {
            name: fullRuleName,
            children: {}
        };
        this.setInitialNodeLocation(cstNode);
        this.CST_STACK.push(cstNode);
    };
    TreeBuilder.prototype.cstFinallyStateUpdate = function () {
        this.CST_STACK.pop();
    };
    TreeBuilder.prototype.cstPostRuleFull = function (ruleCstNode) {
        var prevToken = this.LA(0);
        var loc = ruleCstNode.location;
        // If this condition is true it means we consumed at least one Token
        // In this CstNode.
        if (loc.startOffset <= prevToken.startOffset === true) {
            loc.endOffset = prevToken.endOffset;
            loc.endLine = prevToken.endLine;
            loc.endColumn = prevToken.endColumn;
        }
        // "empty" CstNode edge case
        else {
            loc.startOffset = NaN;
            loc.startLine = NaN;
            loc.startColumn = NaN;
        }
    };
    TreeBuilder.prototype.cstPostRuleOnlyOffset = function (ruleCstNode) {
        var prevToken = this.LA(0);
        var loc = ruleCstNode.location;
        // If this condition is true it means we consumed at least one Token
        // In this CstNode.
        if (loc.startOffset <= prevToken.startOffset === true) {
            loc.endOffset = prevToken.endOffset;
        }
        // "empty" CstNode edge case
        else {
            loc.startOffset = NaN;
        }
    };
    TreeBuilder.prototype.cstPostTerminal = function (key, consumedToken) {
        var rootCst = this.CST_STACK[this.CST_STACK.length - 1];
        addTerminalToCst(rootCst, consumedToken, key);
        // This is only used when **both** error recovery and CST Output are enabled.
        this.setNodeLocationFromToken(rootCst.location, consumedToken);
    };
    TreeBuilder.prototype.cstPostNonTerminal = function (ruleCstResult, ruleName) {
        var preCstNode = this.CST_STACK[this.CST_STACK.length - 1];
        addNoneTerminalToCst(preCstNode, ruleName, ruleCstResult);
        // This is only used when **both** error recovery and CST Output are enabled.
        this.setNodeLocationFromNode(preCstNode.location, ruleCstResult.location);
    };
    TreeBuilder.prototype.getBaseCstVisitorConstructor = function () {
        if ((0,utils/* isUndefined */.o8)(this.baseCstVisitorConstructor)) {
            var newBaseCstVisitorConstructor = createBaseSemanticVisitorConstructor(this.className, (0,utils/* keys */.XP)(this.gastProductionsCache));
            this.baseCstVisitorConstructor = newBaseCstVisitorConstructor;
            return newBaseCstVisitorConstructor;
        }
        return this.baseCstVisitorConstructor;
    };
    TreeBuilder.prototype.getBaseCstVisitorConstructorWithDefaults = function () {
        if ((0,utils/* isUndefined */.o8)(this.baseCstVisitorWithDefaultsConstructor)) {
            var newConstructor = createBaseVisitorConstructorWithDefaults(this.className, (0,utils/* keys */.XP)(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
            this.baseCstVisitorWithDefaultsConstructor = newConstructor;
            return newConstructor;
        }
        return this.baseCstVisitorWithDefaultsConstructor;
    };
    TreeBuilder.prototype.getLastExplicitRuleShortName = function () {
        var ruleStack = this.RULE_STACK;
        return ruleStack[ruleStack.length - 1];
    };
    TreeBuilder.prototype.getPreviousExplicitRuleShortName = function () {
        var ruleStack = this.RULE_STACK;
        return ruleStack[ruleStack.length - 2];
    };
    TreeBuilder.prototype.getLastExplicitRuleOccurrenceIndex = function () {
        var occurrenceStack = this.RULE_OCCURRENCE_STACK;
        return occurrenceStack[occurrenceStack.length - 1];
    };
    return TreeBuilder;
}());

//# sourceMappingURL=tree_builder.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/parser/traits/lexer_adapter.js

/**
 * Trait responsible abstracting over the interaction with Lexer output (Token vector).
 *
 * This could be generalized to support other kinds of lexers, e.g.
 * - Just in Time Lexing / Lexer-Less parsing.
 * - Streaming Lexer.
 */
var LexerAdapter = /** @class */ (function () {
    function LexerAdapter() {
    }
    LexerAdapter.prototype.initLexerAdapter = function () {
        this.tokVector = [];
        this.tokVectorLength = 0;
        this.currIdx = -1;
    };
    Object.defineProperty(LexerAdapter.prototype, "input", {
        get: function () {
            return this.tokVector;
        },
        set: function (newInput) {
            // @ts-ignore - `this parameter` not supported in setters/getters
            //   - https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters
            if (this.selfAnalysisDone !== true) {
                throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
            }
            // @ts-ignore - `this parameter` not supported in setters/getters
            //   - https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters
            this.reset();
            this.tokVector = newInput;
            this.tokVectorLength = newInput.length;
        },
        enumerable: false,
        configurable: true
    });
    // skips a token and returns the next token
    LexerAdapter.prototype.SKIP_TOKEN = function () {
        if (this.currIdx <= this.tokVector.length - 2) {
            this.consumeToken();
            return this.LA(1);
        }
        else {
            return END_OF_FILE;
        }
    };
    // Lexer (accessing Token vector) related methods which can be overridden to implement lazy lexers
    // or lexers dependent on parser context.
    LexerAdapter.prototype.LA = function (howMuch) {
        var soughtIdx = this.currIdx + howMuch;
        if (soughtIdx < 0 || this.tokVectorLength <= soughtIdx) {
            return END_OF_FILE;
        }
        else {
            return this.tokVector[soughtIdx];
        }
    };
    LexerAdapter.prototype.consumeToken = function () {
        this.currIdx++;
    };
    LexerAdapter.prototype.exportLexerState = function () {
        return this.currIdx;
    };
    LexerAdapter.prototype.importLexerState = function (newState) {
        this.currIdx = newState;
    };
    LexerAdapter.prototype.resetLexerState = function () {
        this.currIdx = -1;
    };
    LexerAdapter.prototype.moveToTerminatedState = function () {
        this.currIdx = this.tokVector.length - 1;
    };
    LexerAdapter.prototype.getLexerPosition = function () {
        return this.exportLexerState();
    };
    return LexerAdapter;
}());

//# sourceMappingURL=lexer_adapter.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/parser/traits/recognizer_api.js






/**
 * This trait is responsible for implementing the public API
 * for defining Chevrotain parsers, i.e:
 * - CONSUME
 * - RULE
 * - OPTION
 * - ...
 */
var RecognizerApi = /** @class */ (function () {
    function RecognizerApi() {
    }
    RecognizerApi.prototype.ACTION = function (impl) {
        return impl.call(this);
    };
    RecognizerApi.prototype.consume = function (idx, tokType, options) {
        return this.consumeInternal(tokType, idx, options);
    };
    RecognizerApi.prototype.subrule = function (idx, ruleToCall, options) {
        return this.subruleInternal(ruleToCall, idx, options);
    };
    RecognizerApi.prototype.option = function (idx, actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, idx);
    };
    RecognizerApi.prototype.or = function (idx, altsOrOpts) {
        return this.orInternal(altsOrOpts, idx);
    };
    RecognizerApi.prototype.many = function (idx, actionORMethodDef) {
        return this.manyInternal(idx, actionORMethodDef);
    };
    RecognizerApi.prototype.atLeastOne = function (idx, actionORMethodDef) {
        return this.atLeastOneInternal(idx, actionORMethodDef);
    };
    RecognizerApi.prototype.CONSUME = function (tokType, options) {
        return this.consumeInternal(tokType, 0, options);
    };
    RecognizerApi.prototype.CONSUME1 = function (tokType, options) {
        return this.consumeInternal(tokType, 1, options);
    };
    RecognizerApi.prototype.CONSUME2 = function (tokType, options) {
        return this.consumeInternal(tokType, 2, options);
    };
    RecognizerApi.prototype.CONSUME3 = function (tokType, options) {
        return this.consumeInternal(tokType, 3, options);
    };
    RecognizerApi.prototype.CONSUME4 = function (tokType, options) {
        return this.consumeInternal(tokType, 4, options);
    };
    RecognizerApi.prototype.CONSUME5 = function (tokType, options) {
        return this.consumeInternal(tokType, 5, options);
    };
    RecognizerApi.prototype.CONSUME6 = function (tokType, options) {
        return this.consumeInternal(tokType, 6, options);
    };
    RecognizerApi.prototype.CONSUME7 = function (tokType, options) {
        return this.consumeInternal(tokType, 7, options);
    };
    RecognizerApi.prototype.CONSUME8 = function (tokType, options) {
        return this.consumeInternal(tokType, 8, options);
    };
    RecognizerApi.prototype.CONSUME9 = function (tokType, options) {
        return this.consumeInternal(tokType, 9, options);
    };
    RecognizerApi.prototype.SUBRULE = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 0, options);
    };
    RecognizerApi.prototype.SUBRULE1 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 1, options);
    };
    RecognizerApi.prototype.SUBRULE2 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 2, options);
    };
    RecognizerApi.prototype.SUBRULE3 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 3, options);
    };
    RecognizerApi.prototype.SUBRULE4 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 4, options);
    };
    RecognizerApi.prototype.SUBRULE5 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 5, options);
    };
    RecognizerApi.prototype.SUBRULE6 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 6, options);
    };
    RecognizerApi.prototype.SUBRULE7 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 7, options);
    };
    RecognizerApi.prototype.SUBRULE8 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 8, options);
    };
    RecognizerApi.prototype.SUBRULE9 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 9, options);
    };
    RecognizerApi.prototype.OPTION = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 0);
    };
    RecognizerApi.prototype.OPTION1 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 1);
    };
    RecognizerApi.prototype.OPTION2 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 2);
    };
    RecognizerApi.prototype.OPTION3 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 3);
    };
    RecognizerApi.prototype.OPTION4 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 4);
    };
    RecognizerApi.prototype.OPTION5 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 5);
    };
    RecognizerApi.prototype.OPTION6 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 6);
    };
    RecognizerApi.prototype.OPTION7 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 7);
    };
    RecognizerApi.prototype.OPTION8 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 8);
    };
    RecognizerApi.prototype.OPTION9 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 9);
    };
    RecognizerApi.prototype.OR = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 0);
    };
    RecognizerApi.prototype.OR1 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 1);
    };
    RecognizerApi.prototype.OR2 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 2);
    };
    RecognizerApi.prototype.OR3 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 3);
    };
    RecognizerApi.prototype.OR4 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 4);
    };
    RecognizerApi.prototype.OR5 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 5);
    };
    RecognizerApi.prototype.OR6 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 6);
    };
    RecognizerApi.prototype.OR7 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 7);
    };
    RecognizerApi.prototype.OR8 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 8);
    };
    RecognizerApi.prototype.OR9 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 9);
    };
    RecognizerApi.prototype.MANY = function (actionORMethodDef) {
        this.manyInternal(0, actionORMethodDef);
    };
    RecognizerApi.prototype.MANY1 = function (actionORMethodDef) {
        this.manyInternal(1, actionORMethodDef);
    };
    RecognizerApi.prototype.MANY2 = function (actionORMethodDef) {
        this.manyInternal(2, actionORMethodDef);
    };
    RecognizerApi.prototype.MANY3 = function (actionORMethodDef) {
        this.manyInternal(3, actionORMethodDef);
    };
    RecognizerApi.prototype.MANY4 = function (actionORMethodDef) {
        this.manyInternal(4, actionORMethodDef);
    };
    RecognizerApi.prototype.MANY5 = function (actionORMethodDef) {
        this.manyInternal(5, actionORMethodDef);
    };
    RecognizerApi.prototype.MANY6 = function (actionORMethodDef) {
        this.manyInternal(6, actionORMethodDef);
    };
    RecognizerApi.prototype.MANY7 = function (actionORMethodDef) {
        this.manyInternal(7, actionORMethodDef);
    };
    RecognizerApi.prototype.MANY8 = function (actionORMethodDef) {
        this.manyInternal(8, actionORMethodDef);
    };
    RecognizerApi.prototype.MANY9 = function (actionORMethodDef) {
        this.manyInternal(9, actionORMethodDef);
    };
    RecognizerApi.prototype.MANY_SEP = function (options) {
        this.manySepFirstInternal(0, options);
    };
    RecognizerApi.prototype.MANY_SEP1 = function (options) {
        this.manySepFirstInternal(1, options);
    };
    RecognizerApi.prototype.MANY_SEP2 = function (options) {
        this.manySepFirstInternal(2, options);
    };
    RecognizerApi.prototype.MANY_SEP3 = function (options) {
        this.manySepFirstInternal(3, options);
    };
    RecognizerApi.prototype.MANY_SEP4 = function (options) {
        this.manySepFirstInternal(4, options);
    };
    RecognizerApi.prototype.MANY_SEP5 = function (options) {
        this.manySepFirstInternal(5, options);
    };
    RecognizerApi.prototype.MANY_SEP6 = function (options) {
        this.manySepFirstInternal(6, options);
    };
    RecognizerApi.prototype.MANY_SEP7 = function (options) {
        this.manySepFirstInternal(7, options);
    };
    RecognizerApi.prototype.MANY_SEP8 = function (options) {
        this.manySepFirstInternal(8, options);
    };
    RecognizerApi.prototype.MANY_SEP9 = function (options) {
        this.manySepFirstInternal(9, options);
    };
    RecognizerApi.prototype.AT_LEAST_ONE = function (actionORMethodDef) {
        this.atLeastOneInternal(0, actionORMethodDef);
    };
    RecognizerApi.prototype.AT_LEAST_ONE1 = function (actionORMethodDef) {
        return this.atLeastOneInternal(1, actionORMethodDef);
    };
    RecognizerApi.prototype.AT_LEAST_ONE2 = function (actionORMethodDef) {
        this.atLeastOneInternal(2, actionORMethodDef);
    };
    RecognizerApi.prototype.AT_LEAST_ONE3 = function (actionORMethodDef) {
        this.atLeastOneInternal(3, actionORMethodDef);
    };
    RecognizerApi.prototype.AT_LEAST_ONE4 = function (actionORMethodDef) {
        this.atLeastOneInternal(4, actionORMethodDef);
    };
    RecognizerApi.prototype.AT_LEAST_ONE5 = function (actionORMethodDef) {
        this.atLeastOneInternal(5, actionORMethodDef);
    };
    RecognizerApi.prototype.AT_LEAST_ONE6 = function (actionORMethodDef) {
        this.atLeastOneInternal(6, actionORMethodDef);
    };
    RecognizerApi.prototype.AT_LEAST_ONE7 = function (actionORMethodDef) {
        this.atLeastOneInternal(7, actionORMethodDef);
    };
    RecognizerApi.prototype.AT_LEAST_ONE8 = function (actionORMethodDef) {
        this.atLeastOneInternal(8, actionORMethodDef);
    };
    RecognizerApi.prototype.AT_LEAST_ONE9 = function (actionORMethodDef) {
        this.atLeastOneInternal(9, actionORMethodDef);
    };
    RecognizerApi.prototype.AT_LEAST_ONE_SEP = function (options) {
        this.atLeastOneSepFirstInternal(0, options);
    };
    RecognizerApi.prototype.AT_LEAST_ONE_SEP1 = function (options) {
        this.atLeastOneSepFirstInternal(1, options);
    };
    RecognizerApi.prototype.AT_LEAST_ONE_SEP2 = function (options) {
        this.atLeastOneSepFirstInternal(2, options);
    };
    RecognizerApi.prototype.AT_LEAST_ONE_SEP3 = function (options) {
        this.atLeastOneSepFirstInternal(3, options);
    };
    RecognizerApi.prototype.AT_LEAST_ONE_SEP4 = function (options) {
        this.atLeastOneSepFirstInternal(4, options);
    };
    RecognizerApi.prototype.AT_LEAST_ONE_SEP5 = function (options) {
        this.atLeastOneSepFirstInternal(5, options);
    };
    RecognizerApi.prototype.AT_LEAST_ONE_SEP6 = function (options) {
        this.atLeastOneSepFirstInternal(6, options);
    };
    RecognizerApi.prototype.AT_LEAST_ONE_SEP7 = function (options) {
        this.atLeastOneSepFirstInternal(7, options);
    };
    RecognizerApi.prototype.AT_LEAST_ONE_SEP8 = function (options) {
        this.atLeastOneSepFirstInternal(8, options);
    };
    RecognizerApi.prototype.AT_LEAST_ONE_SEP9 = function (options) {
        this.atLeastOneSepFirstInternal(9, options);
    };
    RecognizerApi.prototype.RULE = function (name, implementation, config) {
        if (config === void 0) { config = DEFAULT_RULE_CONFIG; }
        if ((0,utils/* contains */.r3)(this.definedRulesNames, name)) {
            var errMsg = defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({
                topLevelRule: name,
                grammarName: this.className
            });
            var error = {
                message: errMsg,
                type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
                ruleName: name
            };
            this.definitionErrors.push(error);
        }
        this.definedRulesNames.push(name);
        var ruleImplementation = this.defineRule(name, implementation, config);
        this[name] = ruleImplementation;
        return ruleImplementation;
    };
    RecognizerApi.prototype.OVERRIDE_RULE = function (name, impl, config) {
        if (config === void 0) { config = DEFAULT_RULE_CONFIG; }
        var ruleErrors = [];
        ruleErrors = ruleErrors.concat(validateRuleIsOverridden(name, this.definedRulesNames, this.className));
        this.definitionErrors.push.apply(this.definitionErrors, ruleErrors); // mutability for the win
        var ruleImplementation = this.defineRule(name, impl, config);
        this[name] = ruleImplementation;
        return ruleImplementation;
    };
    RecognizerApi.prototype.BACKTRACK = function (grammarRule, args) {
        return function () {
            // save org state
            this.isBackTrackingStack.push(1);
            var orgState = this.saveRecogState();
            try {
                grammarRule.apply(this, args);
                // if no exception was thrown we have succeed parsing the rule.
                return true;
            }
            catch (e) {
                if (isRecognitionException(e)) {
                    return false;
                }
                else {
                    throw e;
                }
            }
            finally {
                this.reloadRecogState(orgState);
                this.isBackTrackingStack.pop();
            }
        };
    };
    // GAST export APIs
    RecognizerApi.prototype.getGAstProductions = function () {
        return this.gastProductionsCache;
    };
    RecognizerApi.prototype.getSerializedGastProductions = function () {
        return serializeGrammar((0,utils/* values */.VO)(this.gastProductionsCache));
    };
    return RecognizerApi;
}());

//# sourceMappingURL=recognizer_api.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/parser/traits/recognizer_engine.js










/**
 * This trait is responsible for the runtime parsing engine
 * Used by the official API (recognizer_api.ts)
 */
var RecognizerEngine = /** @class */ (function () {
    function RecognizerEngine() {
    }
    RecognizerEngine.prototype.initRecognizerEngine = function (tokenVocabulary, config) {
        this.className = classNameFromInstance(this);
        // TODO: would using an ES6 Map or plain object be faster (CST building scenario)
        this.shortRuleNameToFull = {};
        this.fullRuleNameToShort = {};
        this.ruleShortNameIdx = 256;
        this.tokenMatcher = tokenStructuredMatcherNoCategories;
        this.definedRulesNames = [];
        this.tokensMap = {};
        this.isBackTrackingStack = [];
        this.RULE_STACK = [];
        this.RULE_OCCURRENCE_STACK = [];
        this.gastProductionsCache = {};
        if ((0,utils/* has */.e$)(config, "serializedGrammar")) {
            throw Error("The Parser's configuration can no longer contain a <serializedGrammar> property.\n" +
                "\tSee: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_6-0-0\n" +
                "\tFor Further details.");
        }
        if ((0,utils/* isArray */.kJ)(tokenVocabulary)) {
            // This only checks for Token vocabularies provided as arrays.
            // That is good enough because the main objective is to detect users of pre-V4.0 APIs
            // rather than all edge cases of empty Token vocabularies.
            if ((0,utils/* isEmpty */.xb)(tokenVocabulary)) {
                throw Error("A Token Vocabulary cannot be empty.\n" +
                    "\tNote that the first argument for the parser constructor\n" +
                    "\tis no longer a Token vector (since v4.0).");
            }
            if (typeof tokenVocabulary[0].startOffset === "number") {
                throw Error("The Parser constructor no longer accepts a token vector as the first argument.\n" +
                    "\tSee: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_4-0-0\n" +
                    "\tFor Further details.");
            }
        }
        if ((0,utils/* isArray */.kJ)(tokenVocabulary)) {
            this.tokensMap = (0,utils/* reduce */.u4)(tokenVocabulary, function (acc, tokType) {
                acc[tokType.name] = tokType;
                return acc;
            }, {});
        }
        else if ((0,utils/* has */.e$)(tokenVocabulary, "modes") &&
            (0,utils/* every */.yW)((0,utils/* flatten */.xH)((0,utils/* values */.VO)(tokenVocabulary.modes)), isTokenType)) {
            var allTokenTypes = (0,utils/* flatten */.xH)((0,utils/* values */.VO)(tokenVocabulary.modes));
            var uniqueTokens = (0,utils/* uniq */.jj)(allTokenTypes);
            this.tokensMap = (0,utils/* reduce */.u4)(uniqueTokens, function (acc, tokType) {
                acc[tokType.name] = tokType;
                return acc;
            }, {});
        }
        else if ((0,utils/* isObject */.Kn)(tokenVocabulary)) {
            this.tokensMap = (0,utils/* cloneObj */.Cl)(tokenVocabulary);
        }
        else {
            throw new Error("<tokensDictionary> argument must be An Array of Token constructors," +
                " A dictionary of Token constructors or an IMultiModeLexerDefinition");
        }
        // always add EOF to the tokenNames -> constructors map. it is useful to assure all the input has been
        // parsed with a clear error message ("expecting EOF but found ...")
        /* tslint:disable */
        this.tokensMap["EOF"] = EOF;
        // TODO: This check may not be accurate for multi mode lexers
        var noTokenCategoriesUsed = (0,utils/* every */.yW)((0,utils/* values */.VO)(tokenVocabulary), function (tokenConstructor) { return (0,utils/* isEmpty */.xb)(tokenConstructor.categoryMatches); });
        this.tokenMatcher = noTokenCategoriesUsed
            ? tokenStructuredMatcherNoCategories
            : tokenStructuredMatcher;
        // Because ES2015+ syntax should be supported for creating Token classes
        // We cannot assume that the Token classes were created using the "extendToken" utilities
        // Therefore we must augment the Token classes both on Lexer initialization and on Parser initialization
        augmentTokenTypes((0,utils/* values */.VO)(this.tokensMap));
    };
    RecognizerEngine.prototype.defineRule = function (ruleName, impl, config) {
        if (this.selfAnalysisDone) {
            throw Error("Grammar rule <" + ruleName + "> may not be defined after the 'performSelfAnalysis' method has been called'\n" +
                "Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");
        }
        var resyncEnabled = (0,utils/* has */.e$)(config, "resyncEnabled")
            ? config.resyncEnabled
            : DEFAULT_RULE_CONFIG.resyncEnabled;
        var recoveryValueFunc = (0,utils/* has */.e$)(config, "recoveryValueFunc")
            ? config.recoveryValueFunc
            : DEFAULT_RULE_CONFIG.recoveryValueFunc;
        // performance optimization: Use small integers as keys for the longer human readable "full" rule names.
        // this greatly improves Map access time (as much as 8% for some performance benchmarks).
        /* tslint:disable */
        var shortName = this.ruleShortNameIdx << (BITS_FOR_METHOD_TYPE + BITS_FOR_OCCURRENCE_IDX);
        /* tslint:enable */
        this.ruleShortNameIdx++;
        this.shortRuleNameToFull[shortName] = ruleName;
        this.fullRuleNameToShort[ruleName] = shortName;
        function invokeRuleWithTry(args) {
            try {
                if (this.outputCst === true) {
                    impl.apply(this, args);
                    var cst = this.CST_STACK[this.CST_STACK.length - 1];
                    this.cstPostRule(cst);
                    return cst;
                }
                else {
                    return impl.apply(this, args);
                }
            }
            catch (e) {
                return this.invokeRuleCatch(e, resyncEnabled, recoveryValueFunc);
            }
            finally {
                this.ruleFinallyStateUpdate();
            }
        }
        var wrappedGrammarRule;
        wrappedGrammarRule = function (idxInCallingRule, args) {
            if (idxInCallingRule === void 0) { idxInCallingRule = 0; }
            this.ruleInvocationStateUpdate(shortName, ruleName, idxInCallingRule);
            return invokeRuleWithTry.call(this, args);
        };
        var ruleNamePropName = "ruleName";
        wrappedGrammarRule[ruleNamePropName] = ruleName;
        wrappedGrammarRule["originalGrammarAction"] = impl;
        return wrappedGrammarRule;
    };
    RecognizerEngine.prototype.invokeRuleCatch = function (e, resyncEnabledConfig, recoveryValueFunc) {
        var isFirstInvokedRule = this.RULE_STACK.length === 1;
        // note the reSync is always enabled for the first rule invocation, because we must always be able to
        // reSync with EOF and just output some INVALID ParseTree
        // during backtracking reSync recovery is disabled, otherwise we can't be certain the backtracking
        // path is really the most valid one
        var reSyncEnabled = resyncEnabledConfig && !this.isBackTracking() && this.recoveryEnabled;
        if (isRecognitionException(e)) {
            var recogError = e;
            if (reSyncEnabled) {
                var reSyncTokType = this.findReSyncTokenType();
                if (this.isInCurrentRuleReSyncSet(reSyncTokType)) {
                    recogError.resyncedTokens = this.reSyncTo(reSyncTokType);
                    if (this.outputCst) {
                        var partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
                        partialCstResult.recoveredNode = true;
                        return partialCstResult;
                    }
                    else {
                        return recoveryValueFunc();
                    }
                }
                else {
                    if (this.outputCst) {
                        var partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
                        partialCstResult.recoveredNode = true;
                        recogError.partialCstResult = partialCstResult;
                    }
                    // to be handled Further up the call stack
                    throw recogError;
                }
            }
            else if (isFirstInvokedRule) {
                // otherwise a Redundant input error will be created as well and we cannot guarantee that this is indeed the case
                this.moveToTerminatedState();
                // the parser should never throw one of its own errors outside its flow.
                // even if error recovery is disabled
                return recoveryValueFunc();
            }
            else {
                // to be recovered Further up the call stack
                throw recogError;
            }
        }
        else {
            // some other Error type which we don't know how to handle (for example a built in JavaScript Error)
            throw e;
        }
    };
    // Implementation of parsing DSL
    RecognizerEngine.prototype.optionInternal = function (actionORMethodDef, occurrence) {
        var key = this.getKeyForAutomaticLookahead(OPTION_IDX, occurrence);
        return this.optionInternalLogic(actionORMethodDef, occurrence, key);
    };
    RecognizerEngine.prototype.optionInternalLogic = function (actionORMethodDef, occurrence, key) {
        var _this = this;
        var lookAheadFunc = this.getLaFuncFromCache(key);
        var action;
        var predicate;
        if (actionORMethodDef.DEF !== undefined) {
            action = actionORMethodDef.DEF;
            predicate = actionORMethodDef.GATE;
            // predicate present
            if (predicate !== undefined) {
                var orgLookaheadFunction_1 = lookAheadFunc;
                lookAheadFunc = function () {
                    return predicate.call(_this) && orgLookaheadFunction_1.call(_this);
                };
            }
        }
        else {
            action = actionORMethodDef;
        }
        if (lookAheadFunc.call(this) === true) {
            return action.call(this);
        }
        return undefined;
    };
    RecognizerEngine.prototype.atLeastOneInternal = function (prodOccurrence, actionORMethodDef) {
        var laKey = this.getKeyForAutomaticLookahead(AT_LEAST_ONE_IDX, prodOccurrence);
        return this.atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, laKey);
    };
    RecognizerEngine.prototype.atLeastOneInternalLogic = function (prodOccurrence, actionORMethodDef, key) {
        var _this = this;
        var lookAheadFunc = this.getLaFuncFromCache(key);
        var action;
        var predicate;
        if (actionORMethodDef.DEF !== undefined) {
            action = actionORMethodDef.DEF;
            predicate = actionORMethodDef.GATE;
            // predicate present
            if (predicate !== undefined) {
                var orgLookaheadFunction_2 = lookAheadFunc;
                lookAheadFunc = function () {
                    return predicate.call(_this) && orgLookaheadFunction_2.call(_this);
                };
            }
        }
        else {
            action = actionORMethodDef;
        }
        if (lookAheadFunc.call(this) === true) {
            var notStuck = this.doSingleRepetition(action);
            while (lookAheadFunc.call(this) === true &&
                notStuck === true) {
                notStuck = this.doSingleRepetition(action);
            }
        }
        else {
            throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY, actionORMethodDef.ERR_MSG);
        }
        // note that while it may seem that this can cause an error because by using a recursive call to
        // AT_LEAST_ONE we change the grammar to AT_LEAST_TWO, AT_LEAST_THREE ... , the possible recursive call
        // from the tryInRepetitionRecovery(...) will only happen IFF there really are TWO/THREE/.... items.
        // Performance optimization: "attemptInRepetitionRecovery" will be defined as NOOP unless recovery is enabled
        this.attemptInRepetitionRecovery(this.atLeastOneInternal, [prodOccurrence, actionORMethodDef], lookAheadFunc, AT_LEAST_ONE_IDX, prodOccurrence, NextTerminalAfterAtLeastOneWalker);
    };
    RecognizerEngine.prototype.atLeastOneSepFirstInternal = function (prodOccurrence, options) {
        var laKey = this.getKeyForAutomaticLookahead(AT_LEAST_ONE_SEP_IDX, prodOccurrence);
        this.atLeastOneSepFirstInternalLogic(prodOccurrence, options, laKey);
    };
    RecognizerEngine.prototype.atLeastOneSepFirstInternalLogic = function (prodOccurrence, options, key) {
        var _this = this;
        var action = options.DEF;
        var separator = options.SEP;
        var firstIterationLookaheadFunc = this.getLaFuncFromCache(key);
        // 1st iteration
        if (firstIterationLookaheadFunc.call(this) === true) {
            ;
            action.call(this);
            //  TODO: Optimization can move this function construction into "attemptInRepetitionRecovery"
            //  because it is only needed in error recovery scenarios.
            var separatorLookAheadFunc = function () {
                return _this.tokenMatcher(_this.LA(1), separator);
            };
            // 2nd..nth iterations
            while (this.tokenMatcher(this.LA(1), separator) === true) {
                // note that this CONSUME will never enter recovery because
                // the separatorLookAheadFunc checks that the separator really does exist.
                this.CONSUME(separator);
                action.call(this);
            }
            // Performance optimization: "attemptInRepetitionRecovery" will be defined as NOOP unless recovery is enabled
            this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
                prodOccurrence,
                separator,
                separatorLookAheadFunc,
                action,
                NextTerminalAfterAtLeastOneSepWalker
            ], separatorLookAheadFunc, AT_LEAST_ONE_SEP_IDX, prodOccurrence, NextTerminalAfterAtLeastOneSepWalker);
        }
        else {
            throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, options.ERR_MSG);
        }
    };
    RecognizerEngine.prototype.manyInternal = function (prodOccurrence, actionORMethodDef) {
        var laKey = this.getKeyForAutomaticLookahead(MANY_IDX, prodOccurrence);
        return this.manyInternalLogic(prodOccurrence, actionORMethodDef, laKey);
    };
    RecognizerEngine.prototype.manyInternalLogic = function (prodOccurrence, actionORMethodDef, key) {
        var _this = this;
        var lookaheadFunction = this.getLaFuncFromCache(key);
        var action;
        var predicate;
        if (actionORMethodDef.DEF !== undefined) {
            action = actionORMethodDef.DEF;
            predicate = actionORMethodDef.GATE;
            // predicate present
            if (predicate !== undefined) {
                var orgLookaheadFunction_3 = lookaheadFunction;
                lookaheadFunction = function () {
                    return predicate.call(_this) && orgLookaheadFunction_3.call(_this);
                };
            }
        }
        else {
            action = actionORMethodDef;
        }
        var notStuck = true;
        while (lookaheadFunction.call(this) === true && notStuck === true) {
            notStuck = this.doSingleRepetition(action);
        }
        // Performance optimization: "attemptInRepetitionRecovery" will be defined as NOOP unless recovery is enabled
        this.attemptInRepetitionRecovery(this.manyInternal, [prodOccurrence, actionORMethodDef], lookaheadFunction, MANY_IDX, prodOccurrence, NextTerminalAfterManyWalker, 
        // The notStuck parameter is only relevant when "attemptInRepetitionRecovery"
        // is invoked from manyInternal, in the MANY_SEP case and AT_LEAST_ONE[_SEP]
        // An infinite loop cannot occur as:
        // - Either the lookahead is guaranteed to consume something (Single Token Separator)
        // - AT_LEAST_ONE by definition is guaranteed to consume something (or error out).
        notStuck);
    };
    RecognizerEngine.prototype.manySepFirstInternal = function (prodOccurrence, options) {
        var laKey = this.getKeyForAutomaticLookahead(MANY_SEP_IDX, prodOccurrence);
        this.manySepFirstInternalLogic(prodOccurrence, options, laKey);
    };
    RecognizerEngine.prototype.manySepFirstInternalLogic = function (prodOccurrence, options, key) {
        var _this = this;
        var action = options.DEF;
        var separator = options.SEP;
        var firstIterationLaFunc = this.getLaFuncFromCache(key);
        // 1st iteration
        if (firstIterationLaFunc.call(this) === true) {
            action.call(this);
            var separatorLookAheadFunc = function () {
                return _this.tokenMatcher(_this.LA(1), separator);
            };
            // 2nd..nth iterations
            while (this.tokenMatcher(this.LA(1), separator) === true) {
                // note that this CONSUME will never enter recovery because
                // the separatorLookAheadFunc checks that the separator really does exist.
                this.CONSUME(separator);
                // No need for checking infinite loop here due to consuming the separator.
                action.call(this);
            }
            // Performance optimization: "attemptInRepetitionRecovery" will be defined as NOOP unless recovery is enabled
            this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
                prodOccurrence,
                separator,
                separatorLookAheadFunc,
                action,
                NextTerminalAfterManySepWalker
            ], separatorLookAheadFunc, MANY_SEP_IDX, prodOccurrence, NextTerminalAfterManySepWalker);
        }
    };
    RecognizerEngine.prototype.repetitionSepSecondInternal = function (prodOccurrence, separator, separatorLookAheadFunc, action, nextTerminalAfterWalker) {
        while (separatorLookAheadFunc()) {
            // note that this CONSUME will never enter recovery because
            // the separatorLookAheadFunc checks that the separator really does exist.
            this.CONSUME(separator);
            action.call(this);
        }
        // we can only arrive to this function after an error
        // has occurred (hence the name 'second') so the following
        // IF will always be entered, its possible to remove it...
        // however it is kept to avoid confusion and be consistent.
        // Performance optimization: "attemptInRepetitionRecovery" will be defined as NOOP unless recovery is enabled
        /* istanbul ignore else */
        this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
            prodOccurrence,
            separator,
            separatorLookAheadFunc,
            action,
            nextTerminalAfterWalker
        ], separatorLookAheadFunc, AT_LEAST_ONE_SEP_IDX, prodOccurrence, nextTerminalAfterWalker);
    };
    RecognizerEngine.prototype.doSingleRepetition = function (action) {
        var beforeIteration = this.getLexerPosition();
        action.call(this);
        var afterIteration = this.getLexerPosition();
        // This boolean will indicate if this repetition progressed
        // or if we are "stuck" (potential infinite loop in the repetition).
        return afterIteration > beforeIteration;
    };
    RecognizerEngine.prototype.orInternal = function (altsOrOpts, occurrence) {
        var laKey = this.getKeyForAutomaticLookahead(OR_IDX, occurrence);
        var alts = (0,utils/* isArray */.kJ)(altsOrOpts)
            ? altsOrOpts
            : altsOrOpts.DEF;
        var laFunc = this.getLaFuncFromCache(laKey);
        var altIdxToTake = laFunc.call(this, alts);
        if (altIdxToTake !== undefined) {
            var chosenAlternative = alts[altIdxToTake];
            return chosenAlternative.ALT.call(this);
        }
        this.raiseNoAltException(occurrence, altsOrOpts.ERR_MSG);
    };
    RecognizerEngine.prototype.ruleFinallyStateUpdate = function () {
        this.RULE_STACK.pop();
        this.RULE_OCCURRENCE_STACK.pop();
        // NOOP when cst is disabled
        this.cstFinallyStateUpdate();
        if (this.RULE_STACK.length === 0 && this.isAtEndOfInput() === false) {
            var firstRedundantTok = this.LA(1);
            var errMsg = this.errorMessageProvider.buildNotAllInputParsedMessage({
                firstRedundant: firstRedundantTok,
                ruleName: this.getCurrRuleFullName()
            });
            this.SAVE_ERROR(new NotAllInputParsedException(errMsg, firstRedundantTok));
        }
    };
    RecognizerEngine.prototype.subruleInternal = function (ruleToCall, idx, options) {
        var ruleResult;
        try {
            var args = options !== undefined ? options.ARGS : undefined;
            ruleResult = ruleToCall.call(this, idx, args);
            this.cstPostNonTerminal(ruleResult, options !== undefined && options.LABEL !== undefined
                ? options.LABEL
                : ruleToCall.ruleName);
            return ruleResult;
        }
        catch (e) {
            this.subruleInternalError(e, options, ruleToCall.ruleName);
        }
    };
    RecognizerEngine.prototype.subruleInternalError = function (e, options, ruleName) {
        if (isRecognitionException(e) && e.partialCstResult !== undefined) {
            this.cstPostNonTerminal(e.partialCstResult, options !== undefined && options.LABEL !== undefined
                ? options.LABEL
                : ruleName);
            delete e.partialCstResult;
        }
        throw e;
    };
    RecognizerEngine.prototype.consumeInternal = function (tokType, idx, options) {
        var consumedToken;
        try {
            var nextToken = this.LA(1);
            if (this.tokenMatcher(nextToken, tokType) === true) {
                this.consumeToken();
                consumedToken = nextToken;
            }
            else {
                this.consumeInternalError(tokType, nextToken, options);
            }
        }
        catch (eFromConsumption) {
            consumedToken = this.consumeInternalRecovery(tokType, idx, eFromConsumption);
        }
        this.cstPostTerminal(options !== undefined && options.LABEL !== undefined
            ? options.LABEL
            : tokType.name, consumedToken);
        return consumedToken;
    };
    RecognizerEngine.prototype.consumeInternalError = function (tokType, nextToken, options) {
        var msg;
        var previousToken = this.LA(0);
        if (options !== undefined && options.ERR_MSG) {
            msg = options.ERR_MSG;
        }
        else {
            msg = this.errorMessageProvider.buildMismatchTokenMessage({
                expected: tokType,
                actual: nextToken,
                previous: previousToken,
                ruleName: this.getCurrRuleFullName()
            });
        }
        throw this.SAVE_ERROR(new MismatchedTokenException(msg, nextToken, previousToken));
    };
    RecognizerEngine.prototype.consumeInternalRecovery = function (tokType, idx, eFromConsumption) {
        // no recovery allowed during backtracking, otherwise backtracking may recover invalid syntax and accept it
        // but the original syntax could have been parsed successfully without any backtracking + recovery
        if (this.recoveryEnabled &&
            // TODO: more robust checking of the exception type. Perhaps Typescript extending expressions?
            eFromConsumption.name === "MismatchedTokenException" &&
            !this.isBackTracking()) {
            var follows = this.getFollowsForInRuleRecovery(tokType, idx);
            try {
                return this.tryInRuleRecovery(tokType, follows);
            }
            catch (eFromInRuleRecovery) {
                if (eFromInRuleRecovery.name === IN_RULE_RECOVERY_EXCEPTION) {
                    // failed in RuleRecovery.
                    // throw the original error in order to trigger reSync error recovery
                    throw eFromConsumption;
                }
                else {
                    throw eFromInRuleRecovery;
                }
            }
        }
        else {
            throw eFromConsumption;
        }
    };
    RecognizerEngine.prototype.saveRecogState = function () {
        // errors is a getter which will clone the errors array
        var savedErrors = this.errors;
        var savedRuleStack = (0,utils/* cloneArr */.Qw)(this.RULE_STACK);
        return {
            errors: savedErrors,
            lexerState: this.exportLexerState(),
            RULE_STACK: savedRuleStack,
            CST_STACK: this.CST_STACK
        };
    };
    RecognizerEngine.prototype.reloadRecogState = function (newState) {
        this.errors = newState.errors;
        this.importLexerState(newState.lexerState);
        this.RULE_STACK = newState.RULE_STACK;
    };
    RecognizerEngine.prototype.ruleInvocationStateUpdate = function (shortName, fullName, idxInCallingRule) {
        this.RULE_OCCURRENCE_STACK.push(idxInCallingRule);
        this.RULE_STACK.push(shortName);
        // NOOP when cst is disabled
        this.cstInvocationStateUpdate(fullName, shortName);
    };
    RecognizerEngine.prototype.isBackTracking = function () {
        return this.isBackTrackingStack.length !== 0;
    };
    RecognizerEngine.prototype.getCurrRuleFullName = function () {
        var shortName = this.getLastExplicitRuleShortName();
        return this.shortRuleNameToFull[shortName];
    };
    RecognizerEngine.prototype.shortRuleNameToFullName = function (shortName) {
        return this.shortRuleNameToFull[shortName];
    };
    RecognizerEngine.prototype.isAtEndOfInput = function () {
        return this.tokenMatcher(this.LA(1), EOF);
    };
    RecognizerEngine.prototype.reset = function () {
        this.resetLexerState();
        this.isBackTrackingStack = [];
        this.errors = [];
        this.RULE_STACK = [];
        // TODO: extract a specific reset for TreeBuilder trait
        this.CST_STACK = [];
        this.RULE_OCCURRENCE_STACK = [];
    };
    return RecognizerEngine;
}());

//# sourceMappingURL=recognizer_engine.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/parser/traits/error_handler.js




/**
 * Trait responsible for runtime parsing errors.
 */
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    ErrorHandler.prototype.initErrorHandler = function (config) {
        this._errors = [];
        this.errorMessageProvider = (0,utils/* has */.e$)(config, "errorMessageProvider")
            ? config.errorMessageProvider
            : DEFAULT_PARSER_CONFIG.errorMessageProvider;
    };
    ErrorHandler.prototype.SAVE_ERROR = function (error) {
        if (isRecognitionException(error)) {
            error.context = {
                ruleStack: this.getHumanReadableRuleStack(),
                ruleOccurrenceStack: (0,utils/* cloneArr */.Qw)(this.RULE_OCCURRENCE_STACK)
            };
            this._errors.push(error);
            return error;
        }
        else {
            throw Error("Trying to save an Error which is not a RecognitionException");
        }
    };
    Object.defineProperty(ErrorHandler.prototype, "errors", {
        get: function () {
            return (0,utils/* cloneArr */.Qw)(this._errors);
        },
        set: function (newErrors) {
            this._errors = newErrors;
        },
        enumerable: false,
        configurable: true
    });
    // TODO: consider caching the error message computed information
    ErrorHandler.prototype.raiseEarlyExitException = function (occurrence, prodType, userDefinedErrMsg) {
        var ruleName = this.getCurrRuleFullName();
        var ruleGrammar = this.getGAstProductions()[ruleName];
        var lookAheadPathsPerAlternative = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, this.maxLookahead);
        var insideProdPaths = lookAheadPathsPerAlternative[0];
        var actualTokens = [];
        for (var i = 1; i <= this.maxLookahead; i++) {
            actualTokens.push(this.LA(i));
        }
        var msg = this.errorMessageProvider.buildEarlyExitMessage({
            expectedIterationPaths: insideProdPaths,
            actual: actualTokens,
            previous: this.LA(0),
            customUserDescription: userDefinedErrMsg,
            ruleName: ruleName
        });
        throw this.SAVE_ERROR(new EarlyExitException(msg, this.LA(1), this.LA(0)));
    };
    // TODO: consider caching the error message computed information
    ErrorHandler.prototype.raiseNoAltException = function (occurrence, errMsgTypes) {
        var ruleName = this.getCurrRuleFullName();
        var ruleGrammar = this.getGAstProductions()[ruleName];
        // TODO: getLookaheadPathsForOr can be slow for large enough maxLookahead and certain grammars, consider caching ?
        var lookAheadPathsPerAlternative = getLookaheadPathsForOr(occurrence, ruleGrammar, this.maxLookahead);
        var actualTokens = [];
        for (var i = 1; i <= this.maxLookahead; i++) {
            actualTokens.push(this.LA(i));
        }
        var previousToken = this.LA(0);
        var errMsg = this.errorMessageProvider.buildNoViableAltMessage({
            expectedPathsPerAlt: lookAheadPathsPerAlternative,
            actual: actualTokens,
            previous: previousToken,
            customUserDescription: errMsgTypes,
            ruleName: this.getCurrRuleFullName()
        });
        throw this.SAVE_ERROR(new NoViableAltException(errMsg, this.LA(1), previousToken));
    };
    return ErrorHandler;
}());

//# sourceMappingURL=error_handler.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/parser/traits/context_assist.js


var ContentAssist = /** @class */ (function () {
    function ContentAssist() {
    }
    ContentAssist.prototype.initContentAssist = function () { };
    ContentAssist.prototype.computeContentAssist = function (startRuleName, precedingInput) {
        var startRuleGast = this.gastProductionsCache[startRuleName];
        if ((0,utils/* isUndefined */.o8)(startRuleGast)) {
            throw Error("Rule ->" + startRuleName + "<- does not exist in this grammar.");
        }
        return nextPossibleTokensAfter([startRuleGast], precedingInput, this.tokenMatcher, this.maxLookahead);
    };
    // TODO: should this be a member method or a utility? it does not have any state or usage of 'this'...
    // TODO: should this be more explicitly part of the public API?
    ContentAssist.prototype.getNextPossibleTokenTypes = function (grammarPath) {
        var topRuleName = (0,utils/* first */.Ps)(grammarPath.ruleStack);
        var gastProductions = this.getGAstProductions();
        var topProduction = gastProductions[topRuleName];
        var nextPossibleTokenTypes = new NextAfterTokenWalker(topProduction, grammarPath).startWalking();
        return nextPossibleTokenTypes;
    };
    return ContentAssist;
}());

//# sourceMappingURL=context_assist.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/parser/traits/gast_recorder.js







var RECORDING_NULL_OBJECT = {
    description: "This Object indicates the Parser is during Recording Phase"
};
Object.freeze(RECORDING_NULL_OBJECT);
var HANDLE_SEPARATOR = true;
var MAX_METHOD_IDX = Math.pow(2, BITS_FOR_OCCURRENCE_IDX) - 1;
var RFT = createToken({ name: "RECORDING_PHASE_TOKEN", pattern: Lexer.NA });
augmentTokenTypes([RFT]);
var RECORDING_PHASE_TOKEN = createTokenInstance(RFT, "This IToken indicates the Parser is in Recording Phase\n\t" +
    "" +
    "See: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details", 
// Using "-1" instead of NaN (as in EOF) because an actual number is less likely to
// cause errors if the output of LA or CONSUME would be (incorrectly) used during the recording phase.
-1, -1, -1, -1, -1, -1);
Object.freeze(RECORDING_PHASE_TOKEN);
var RECORDING_PHASE_CSTNODE = {
    name: "This CSTNode indicates the Parser is in Recording Phase\n\t" +
        "See: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details",
    children: {}
};
/**
 * This trait handles the creation of the GAST structure for Chevrotain Grammars
 */
var GastRecorder = /** @class */ (function () {
    function GastRecorder() {
    }
    GastRecorder.prototype.initGastRecorder = function (config) {
        this.recordingProdStack = [];
        this.RECORDING_PHASE = false;
    };
    GastRecorder.prototype.enableRecording = function () {
        var _this = this;
        this.RECORDING_PHASE = true;
        this.TRACE_INIT("Enable Recording", function () {
            var _loop_1 = function (i) {
                var idx = i > 0 ? i : "";
                _this["CONSUME" + idx] = function (arg1, arg2) {
                    return this.consumeInternalRecord(arg1, i, arg2);
                };
                _this["SUBRULE" + idx] = function (arg1, arg2) {
                    return this.subruleInternalRecord(arg1, i, arg2);
                };
                _this["OPTION" + idx] = function (arg1) {
                    return this.optionInternalRecord(arg1, i);
                };
                _this["OR" + idx] = function (arg1) {
                    return this.orInternalRecord(arg1, i);
                };
                _this["MANY" + idx] = function (arg1) {
                    this.manyInternalRecord(i, arg1);
                };
                _this["MANY_SEP" + idx] = function (arg1) {
                    this.manySepFirstInternalRecord(i, arg1);
                };
                _this["AT_LEAST_ONE" + idx] = function (arg1) {
                    this.atLeastOneInternalRecord(i, arg1);
                };
                _this["AT_LEAST_ONE_SEP" + idx] = function (arg1) {
                    this.atLeastOneSepFirstInternalRecord(i, arg1);
                };
            };
            /**
             * Warning Dark Voodoo Magic upcoming!
             * We are "replacing" the public parsing DSL methods API
             * With **new** alternative implementations on the Parser **instance**
             *
             * So far this is the only way I've found to avoid performance regressions during parsing time.
             * - Approx 30% performance regression was measured on Chrome 75 Canary when attempting to replace the "internal"
             *   implementations directly instead.
             */
            for (var i = 0; i < 10; i++) {
                _loop_1(i);
            }
            // DSL methods with the idx(suffix) as an argument
            _this["consume"] = function (idx, arg1, arg2) {
                return this.consumeInternalRecord(arg1, idx, arg2);
            };
            _this["subrule"] = function (idx, arg1, arg2) {
                return this.subruleInternalRecord(arg1, idx, arg2);
            };
            _this["option"] = function (idx, arg1) {
                return this.optionInternalRecord(arg1, idx);
            };
            _this["or"] = function (idx, arg1) {
                return this.orInternalRecord(arg1, idx);
            };
            _this["many"] = function (idx, arg1) {
                this.manyInternalRecord(idx, arg1);
            };
            _this["atLeastOne"] = function (idx, arg1) {
                this.atLeastOneInternalRecord(idx, arg1);
            };
            _this.ACTION = _this.ACTION_RECORD;
            _this.BACKTRACK = _this.BACKTRACK_RECORD;
            _this.LA = _this.LA_RECORD;
        });
    };
    GastRecorder.prototype.disableRecording = function () {
        var _this = this;
        this.RECORDING_PHASE = false;
        // By deleting these **instance** properties, any future invocation
        // will be deferred to the original methods on the **prototype** object
        // This seems to get rid of any incorrect optimizations that V8 may
        // do during the recording phase.
        this.TRACE_INIT("Deleting Recording methods", function () {
            for (var i = 0; i < 10; i++) {
                var idx = i > 0 ? i : "";
                delete _this["CONSUME" + idx];
                delete _this["SUBRULE" + idx];
                delete _this["OPTION" + idx];
                delete _this["OR" + idx];
                delete _this["MANY" + idx];
                delete _this["MANY_SEP" + idx];
                delete _this["AT_LEAST_ONE" + idx];
                delete _this["AT_LEAST_ONE_SEP" + idx];
            }
            delete _this["consume"];
            delete _this["subrule"];
            delete _this["option"];
            delete _this["or"];
            delete _this["many"];
            delete _this["atLeastOne"];
            delete _this.ACTION;
            delete _this.BACKTRACK;
            delete _this.LA;
        });
    };
    // TODO: is there any way to use this method to check no
    //   Parser methods are called inside an ACTION?
    //   Maybe try/catch/finally on ACTIONS while disabling the recorders state changes?
    GastRecorder.prototype.ACTION_RECORD = function (impl) {
        // NO-OP during recording
        return;
    };
    // Executing backtracking logic will break our recording logic assumptions
    GastRecorder.prototype.BACKTRACK_RECORD = function (grammarRule, args) {
        return function () { return true; };
    };
    // LA is part of the official API and may be used for custom lookahead logic
    // by end users who may forget to wrap it in ACTION or inside a GATE
    GastRecorder.prototype.LA_RECORD = function (howMuch) {
        // We cannot use the RECORD_PHASE_TOKEN here because someone may depend
        // On LA return EOF at the end of the input so an infinite loop may occur.
        return END_OF_FILE;
    };
    GastRecorder.prototype.topLevelRuleRecord = function (name, def) {
        try {
            var newTopLevelRule = new Rule({ definition: [], name: name });
            newTopLevelRule.name = name;
            this.recordingProdStack.push(newTopLevelRule);
            def.call(this);
            this.recordingProdStack.pop();
            return newTopLevelRule;
        }
        catch (originalError) {
            if (originalError.KNOWN_RECORDER_ERROR !== true) {
                try {
                    originalError.message =
                        originalError.message +
                            '\n\t This error was thrown during the "grammar recording phase" For more info see:\n\t' +
                            "https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording";
                }
                catch (mutabilityError) {
                    // We may not be able to modify the original error object
                    throw originalError;
                }
            }
            throw originalError;
        }
    };
    // Implementation of parsing DSL
    GastRecorder.prototype.optionInternalRecord = function (actionORMethodDef, occurrence) {
        return recordProd.call(this, Option, actionORMethodDef, occurrence);
    };
    GastRecorder.prototype.atLeastOneInternalRecord = function (occurrence, actionORMethodDef) {
        recordProd.call(this, RepetitionMandatory, actionORMethodDef, occurrence);
    };
    GastRecorder.prototype.atLeastOneSepFirstInternalRecord = function (occurrence, options) {
        recordProd.call(this, RepetitionMandatoryWithSeparator, options, occurrence, HANDLE_SEPARATOR);
    };
    GastRecorder.prototype.manyInternalRecord = function (occurrence, actionORMethodDef) {
        recordProd.call(this, Repetition, actionORMethodDef, occurrence);
    };
    GastRecorder.prototype.manySepFirstInternalRecord = function (occurrence, options) {
        recordProd.call(this, RepetitionWithSeparator, options, occurrence, HANDLE_SEPARATOR);
    };
    GastRecorder.prototype.orInternalRecord = function (altsOrOpts, occurrence) {
        return recordOrProd.call(this, altsOrOpts, occurrence);
    };
    GastRecorder.prototype.subruleInternalRecord = function (ruleToCall, occurrence, options) {
        assertMethodIdxIsValid(occurrence);
        if (!ruleToCall || (0,utils/* has */.e$)(ruleToCall, "ruleName") === false) {
            var error = new Error("<SUBRULE" + getIdxSuffix(occurrence) + "> argument is invalid" +
                (" expecting a Parser method reference but got: <" + JSON.stringify(ruleToCall) + ">") +
                ("\n inside top level rule: <" + this.recordingProdStack[0].name + ">"));
            error.KNOWN_RECORDER_ERROR = true;
            throw error;
        }
        var prevProd = (0,utils/* peek */.fj)(this.recordingProdStack);
        var ruleName = ruleToCall["ruleName"];
        var newNoneTerminal = new NonTerminal({
            idx: occurrence,
            nonTerminalName: ruleName,
            // The resolving of the `referencedRule` property will be done once all the Rule's GASTs have been created
            referencedRule: undefined
        });
        prevProd.definition.push(newNoneTerminal);
        return this.outputCst ? RECORDING_PHASE_CSTNODE : RECORDING_NULL_OBJECT;
    };
    GastRecorder.prototype.consumeInternalRecord = function (tokType, occurrence, options) {
        assertMethodIdxIsValid(occurrence);
        if (!hasShortKeyProperty(tokType)) {
            var error = new Error("<CONSUME" + getIdxSuffix(occurrence) + "> argument is invalid" +
                (" expecting a TokenType reference but got: <" + JSON.stringify(tokType) + ">") +
                ("\n inside top level rule: <" + this.recordingProdStack[0].name + ">"));
            error.KNOWN_RECORDER_ERROR = true;
            throw error;
        }
        var prevProd = (0,utils/* peek */.fj)(this.recordingProdStack);
        var newNoneTerminal = new Terminal({
            idx: occurrence,
            terminalType: tokType
        });
        prevProd.definition.push(newNoneTerminal);
        return RECORDING_PHASE_TOKEN;
    };
    return GastRecorder;
}());

function recordProd(prodConstructor, mainProdArg, occurrence, handleSep) {
    if (handleSep === void 0) { handleSep = false; }
    assertMethodIdxIsValid(occurrence);
    var prevProd = (0,utils/* peek */.fj)(this.recordingProdStack);
    var grammarAction = (0,utils/* isFunction */.mf)(mainProdArg) ? mainProdArg : mainProdArg.DEF;
    var newProd = new prodConstructor({ definition: [], idx: occurrence });
    if (handleSep) {
        newProd.separator = mainProdArg.SEP;
    }
    if ((0,utils/* has */.e$)(mainProdArg, "MAX_LOOKAHEAD")) {
        newProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
    }
    this.recordingProdStack.push(newProd);
    grammarAction.call(this);
    prevProd.definition.push(newProd);
    this.recordingProdStack.pop();
    return RECORDING_NULL_OBJECT;
}
function recordOrProd(mainProdArg, occurrence) {
    var _this = this;
    assertMethodIdxIsValid(occurrence);
    var prevProd = (0,utils/* peek */.fj)(this.recordingProdStack);
    // Only an array of alternatives
    var hasOptions = (0,utils/* isArray */.kJ)(mainProdArg) === false;
    var alts = hasOptions === false ? mainProdArg : mainProdArg.DEF;
    var newOrProd = new Alternation({
        definition: [],
        idx: occurrence,
        ignoreAmbiguities: hasOptions && mainProdArg.IGNORE_AMBIGUITIES === true
    });
    if ((0,utils/* has */.e$)(mainProdArg, "MAX_LOOKAHEAD")) {
        newOrProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD;
    }
    var hasPredicates = (0,utils/* some */.G)(alts, function (currAlt) { return (0,utils/* isFunction */.mf)(currAlt.GATE); });
    newOrProd.hasPredicates = hasPredicates;
    prevProd.definition.push(newOrProd);
    (0,utils/* forEach */.Ed)(alts, function (currAlt) {
        var currAltFlat = new Alternative({ definition: [] });
        newOrProd.definition.push(currAltFlat);
        if ((0,utils/* has */.e$)(currAlt, "IGNORE_AMBIGUITIES")) {
            currAltFlat.ignoreAmbiguities = currAlt.IGNORE_AMBIGUITIES;
        }
        // **implicit** ignoreAmbiguities due to usage of gate
        else if ((0,utils/* has */.e$)(currAlt, "GATE")) {
            currAltFlat.ignoreAmbiguities = true;
        }
        _this.recordingProdStack.push(currAltFlat);
        currAlt.ALT.call(_this);
        _this.recordingProdStack.pop();
    });
    return RECORDING_NULL_OBJECT;
}
function getIdxSuffix(idx) {
    return idx === 0 ? "" : "" + idx;
}
function assertMethodIdxIsValid(idx) {
    if (idx < 0 || idx > MAX_METHOD_IDX) {
        var error = new Error(
        // The stack trace will contain all the needed details
        "Invalid DSL Method idx value: <" + idx + ">\n\t" +
            ("Idx value must be a none negative value smaller than " + (MAX_METHOD_IDX + 1)));
        error.KNOWN_RECORDER_ERROR = true;
        throw error;
    }
}
//# sourceMappingURL=gast_recorder.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/parser/traits/perf_tracer.js


/**
 * Trait responsible for runtime parsing errors.
 */
var PerformanceTracer = /** @class */ (function () {
    function PerformanceTracer() {
    }
    PerformanceTracer.prototype.initPerformanceTracer = function (config) {
        if ((0,utils/* has */.e$)(config, "traceInitPerf")) {
            var userTraceInitPerf = config.traceInitPerf;
            var traceIsNumber = typeof userTraceInitPerf === "number";
            this.traceInitMaxIdent = traceIsNumber
                ? userTraceInitPerf
                : Infinity;
            this.traceInitPerf = traceIsNumber
                ? userTraceInitPerf > 0
                : userTraceInitPerf;
        }
        else {
            this.traceInitMaxIdent = 0;
            this.traceInitPerf = DEFAULT_PARSER_CONFIG.traceInitPerf;
        }
        this.traceInitIndent = -1;
    };
    PerformanceTracer.prototype.TRACE_INIT = function (phaseDesc, phaseImpl) {
        // No need to optimize this using NOOP pattern because
        // It is not called in a hot spot...
        if (this.traceInitPerf === true) {
            this.traceInitIndent++;
            var indent = new Array(this.traceInitIndent + 1).join("\t");
            if (this.traceInitIndent < this.traceInitMaxIdent) {
                console.log(indent + "--> <" + phaseDesc + ">");
            }
            var _a = (0,utils/* timer */.HT)(phaseImpl), time = _a.time, value = _a.value;
            /* istanbul ignore next - Difficult to reproduce specific performance behavior (>10ms) in tests */
            var traceMethod = time > 10 ? console.warn : console.log;
            if (this.traceInitIndent < this.traceInitMaxIdent) {
                traceMethod(indent + "<-- <" + phaseDesc + "> time: " + time + "ms");
            }
            this.traceInitIndent--;
            return value;
        }
        else {
            return phaseImpl();
        }
    };
    return PerformanceTracer;
}());

//# sourceMappingURL=perf_tracer.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/parse/parser/parser.js
var parser_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();















var END_OF_FILE = createTokenInstance(EOF, "", NaN, NaN, NaN, NaN, NaN, NaN);
Object.freeze(END_OF_FILE);
var DEFAULT_PARSER_CONFIG = Object.freeze({
    recoveryEnabled: false,
    maxLookahead: 3,
    dynamicTokensEnabled: false,
    outputCst: true,
    errorMessageProvider: defaultParserErrorProvider,
    nodeLocationTracking: "none",
    traceInitPerf: false,
    skipValidations: false
});
var DEFAULT_RULE_CONFIG = Object.freeze({
    recoveryValueFunc: function () { return undefined; },
    resyncEnabled: true
});
var ParserDefinitionErrorType;
(function (ParserDefinitionErrorType) {
    ParserDefinitionErrorType[ParserDefinitionErrorType["INVALID_RULE_NAME"] = 0] = "INVALID_RULE_NAME";
    ParserDefinitionErrorType[ParserDefinitionErrorType["DUPLICATE_RULE_NAME"] = 1] = "DUPLICATE_RULE_NAME";
    ParserDefinitionErrorType[ParserDefinitionErrorType["INVALID_RULE_OVERRIDE"] = 2] = "INVALID_RULE_OVERRIDE";
    ParserDefinitionErrorType[ParserDefinitionErrorType["DUPLICATE_PRODUCTIONS"] = 3] = "DUPLICATE_PRODUCTIONS";
    ParserDefinitionErrorType[ParserDefinitionErrorType["UNRESOLVED_SUBRULE_REF"] = 4] = "UNRESOLVED_SUBRULE_REF";
    ParserDefinitionErrorType[ParserDefinitionErrorType["LEFT_RECURSION"] = 5] = "LEFT_RECURSION";
    ParserDefinitionErrorType[ParserDefinitionErrorType["NONE_LAST_EMPTY_ALT"] = 6] = "NONE_LAST_EMPTY_ALT";
    ParserDefinitionErrorType[ParserDefinitionErrorType["AMBIGUOUS_ALTS"] = 7] = "AMBIGUOUS_ALTS";
    ParserDefinitionErrorType[ParserDefinitionErrorType["CONFLICT_TOKENS_RULES_NAMESPACE"] = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE";
    ParserDefinitionErrorType[ParserDefinitionErrorType["INVALID_TOKEN_NAME"] = 9] = "INVALID_TOKEN_NAME";
    ParserDefinitionErrorType[ParserDefinitionErrorType["NO_NON_EMPTY_LOOKAHEAD"] = 10] = "NO_NON_EMPTY_LOOKAHEAD";
    ParserDefinitionErrorType[ParserDefinitionErrorType["AMBIGUOUS_PREFIX_ALTS"] = 11] = "AMBIGUOUS_PREFIX_ALTS";
    ParserDefinitionErrorType[ParserDefinitionErrorType["TOO_MANY_ALTS"] = 12] = "TOO_MANY_ALTS";
})(ParserDefinitionErrorType || (ParserDefinitionErrorType = {}));
function EMPTY_ALT(value) {
    if (value === void 0) { value = undefined; }
    return function () {
        return value;
    };
}
var Parser = /** @class */ (function () {
    function Parser(tokenVocabulary, config) {
        this.definitionErrors = [];
        this.selfAnalysisDone = false;
        var that = this;
        that.initErrorHandler(config);
        that.initLexerAdapter();
        that.initLooksAhead(config);
        that.initRecognizerEngine(tokenVocabulary, config);
        that.initRecoverable(config);
        that.initTreeBuilder(config);
        that.initContentAssist();
        that.initGastRecorder(config);
        that.initPerformanceTracer(config);
        if ((0,utils/* has */.e$)(config, "ignoredIssues")) {
            throw new Error("The <ignoredIssues> IParserConfig property has been deprecated.\n\t" +
                "Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.\n\t" +
                "See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES\n\t" +
                "For further details.");
        }
        this.skipValidations = (0,utils/* has */.e$)(config, "skipValidations")
            ? config.skipValidations
            : DEFAULT_PARSER_CONFIG.skipValidations;
    }
    /**
     *  @deprecated use the **instance** method with the same name instead
     */
    Parser.performSelfAnalysis = function (parserInstance) {
        throw Error("The **static** `performSelfAnalysis` method has been deprecated." +
            "\t\nUse the **instance** method with the same name instead.");
    };
    Parser.prototype.performSelfAnalysis = function () {
        var _this = this;
        this.TRACE_INIT("performSelfAnalysis", function () {
            var defErrorsMsgs;
            _this.selfAnalysisDone = true;
            var className = _this.className;
            _this.TRACE_INIT("toFastProps", function () {
                // Without this voodoo magic the parser would be x3-x4 slower
                // It seems it is better to invoke `toFastProperties` **before**
                // Any manipulations of the `this` object done during the recording phase.
                (0,utils/* toFastProperties */.SV)(_this);
            });
            _this.TRACE_INIT("Grammar Recording", function () {
                try {
                    _this.enableRecording();
                    // Building the GAST
                    (0,utils/* forEach */.Ed)(_this.definedRulesNames, function (currRuleName) {
                        var wrappedRule = _this[currRuleName];
                        var originalGrammarAction = wrappedRule["originalGrammarAction"];
                        var recordedRuleGast = undefined;
                        _this.TRACE_INIT(currRuleName + " Rule", function () {
                            recordedRuleGast = _this.topLevelRuleRecord(currRuleName, originalGrammarAction);
                        });
                        _this.gastProductionsCache[currRuleName] = recordedRuleGast;
                    });
                }
                finally {
                    _this.disableRecording();
                }
            });
            var resolverErrors = [];
            _this.TRACE_INIT("Grammar Resolving", function () {
                resolverErrors = gast_resolver_public_resolveGrammar({
                    rules: (0,utils/* values */.VO)(_this.gastProductionsCache)
                });
                _this.definitionErrors.push.apply(_this.definitionErrors, resolverErrors); // mutability for the win?
            });
            _this.TRACE_INIT("Grammar Validations", function () {
                // only perform additional grammar validations IFF no resolving errors have occurred.
                // as unresolved grammar may lead to unhandled runtime exceptions in the follow up validations.
                if ((0,utils/* isEmpty */.xb)(resolverErrors) && _this.skipValidations === false) {
                    var validationErrors = gast_resolver_public_validateGrammar({
                        rules: (0,utils/* values */.VO)(_this.gastProductionsCache),
                        maxLookahead: _this.maxLookahead,
                        tokenTypes: (0,utils/* values */.VO)(_this.tokensMap),
                        errMsgProvider: defaultGrammarValidatorErrorProvider,
                        grammarName: className
                    });
                    _this.definitionErrors.push.apply(_this.definitionErrors, validationErrors); // mutability for the win?
                }
            });
            // this analysis may fail if the grammar is not perfectly valid
            if ((0,utils/* isEmpty */.xb)(_this.definitionErrors)) {
                // The results of these computations are not needed unless error recovery is enabled.
                if (_this.recoveryEnabled) {
                    _this.TRACE_INIT("computeAllProdsFollows", function () {
                        var allFollows = computeAllProdsFollows((0,utils/* values */.VO)(_this.gastProductionsCache));
                        _this.resyncFollows = allFollows;
                    });
                }
                _this.TRACE_INIT("ComputeLookaheadFunctions", function () {
                    _this.preComputeLookaheadFunctions((0,utils/* values */.VO)(_this.gastProductionsCache));
                });
            }
            if (!Parser.DEFER_DEFINITION_ERRORS_HANDLING &&
                !(0,utils/* isEmpty */.xb)(_this.definitionErrors)) {
                defErrorsMsgs = (0,utils/* map */.UI)(_this.definitionErrors, function (defError) { return defError.message; });
                throw new Error("Parser Definition Errors detected:\n " + defErrorsMsgs.join("\n-------------------------------\n"));
            }
        });
    };
    // Set this flag to true if you don't want the Parser to throw error when problems in it's definition are detected.
    // (normally during the parser's constructor).
    // This is a design time flag, it will not affect the runtime error handling of the parser, just design time errors,
    // for example: duplicate rule names, referencing an unresolved subrule, ect...
    // This flag should not be enabled during normal usage, it is used in special situations, for example when
    // needing to display the parser definition errors in some GUI(online playground).
    Parser.DEFER_DEFINITION_ERRORS_HANDLING = false;
    return Parser;
}());

(0,utils/* applyMixins */.ef)(Parser, [
    Recoverable,
    LooksAhead,
    TreeBuilder,
    LexerAdapter,
    RecognizerEngine,
    RecognizerApi,
    ErrorHandler,
    ContentAssist,
    GastRecorder,
    PerformanceTracer
]);
var CstParser = /** @class */ (function (_super) {
    parser_extends(CstParser, _super);
    function CstParser(tokenVocabulary, config) {
        if (config === void 0) { config = DEFAULT_PARSER_CONFIG; }
        var _this = this;
        var configClone = (0,utils/* cloneObj */.Cl)(config);
        configClone.outputCst = true;
        _this = _super.call(this, tokenVocabulary, configClone) || this;
        return _this;
    }
    return CstParser;
}(Parser));

var EmbeddedActionsParser = /** @class */ (function (_super) {
    parser_extends(EmbeddedActionsParser, _super);
    function EmbeddedActionsParser(tokenVocabulary, config) {
        if (config === void 0) { config = DEFAULT_PARSER_CONFIG; }
        var _this = this;
        var configClone = (0,utils/* cloneObj */.Cl)(config);
        configClone.outputCst = false;
        _this = _super.call(this, tokenVocabulary, configClone) || this;
        return _this;
    }
    return EmbeddedActionsParser;
}(Parser));

//# sourceMappingURL=parser.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/diagrams/render_public.js

function createSyntaxDiagramsCode(grammar, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.resourceBase, resourceBase = _c === void 0 ? "https://unpkg.com/chevrotain@" + VERSION + "/diagrams/" : _c, _d = _b.css, css = _d === void 0 ? "https://unpkg.com/chevrotain@" + VERSION + "/diagrams/diagrams.css" : _d;
    var header = "\n<!-- This is a generated file -->\n<!DOCTYPE html>\n<meta charset=\"utf-8\">\n<style>\n  body {\n    background-color: hsl(30, 20%, 95%)\n  }\n</style>\n\n";
    var cssHtml = "\n<link rel='stylesheet' href='" + css + "'>\n";
    var scripts = "\n<script src='" + resourceBase + "vendor/railroad-diagrams.js'></script>\n<script src='" + resourceBase + "src/diagrams_builder.js'></script>\n<script src='" + resourceBase + "src/diagrams_behavior.js'></script>\n<script src='" + resourceBase + "src/main.js'></script>\n";
    var diagramsDiv = "\n<div id=\"diagrams\" align=\"center\"></div>    \n";
    var serializedGrammar = "\n<script>\n    window.serializedGrammar = " + JSON.stringify(grammar, null, "  ") + ";\n</script>\n";
    var initLogic = "\n<script>\n    var diagramsDiv = document.getElementById(\"diagrams\");\n    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);\n</script>\n";
    return (header + cssHtml + scripts + diagramsDiv + serializedGrammar + initLogic);
}
//# sourceMappingURL=render_public.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/generate/generate.js


/**
 * Missing features
 * 1. Rule arguments
 * 2. Gates
 * 3. embedded actions
 */
var NL = "\n";
function genUmdModule(options) {
    return "\n(function (root, factory) {\n    if (typeof define === 'function' && define.amd) {\n        // AMD. Register as an anonymous module.\n        define(['chevrotain'], factory);\n    } else if (typeof module === 'object' && module.exports) {\n        // Node. Does not work with strict CommonJS, but\n        // only CommonJS-like environments that support module.exports,\n        // like Node.\n        module.exports = factory(require('chevrotain'));\n    } else {\n        // Browser globals (root is window)\n        root.returnExports = factory(root.b);\n    }\n}(typeof self !== 'undefined' ? self : this, function (chevrotain) {\n\n" + genClass(options) + "\n    \nreturn {\n    " + options.name + ": " + options.name + " \n}\n}));\n";
}
function genWrapperFunction(options) {
    return "    \n" + genClass(options) + "\nreturn new " + options.name + "(tokenVocabulary, config)    \n";
}
function genClass(options) {
    // TODO: how to pass the token vocabulary? Constructor? other?
    var result = "\nfunction " + options.name + "(tokenVocabulary, config) {\n    // invoke super constructor\n    // No support for embedded actions currently, so we can 'hardcode'\n    // The use of CstParser.\n    chevrotain.CstParser.call(this, tokenVocabulary, config)\n\n    const $ = this\n\n    " + genAllRules(options.rules) + "\n\n    // very important to call this after all the rules have been defined.\n    // otherwise the parser may not work correctly as it will lack information\n    // derived during the self analysis phase.\n    this.performSelfAnalysis(this)\n}\n\n// inheritance as implemented in javascript in the previous decade... :(\n" + options.name + ".prototype = Object.create(chevrotain.CstParser.prototype)\n" + options.name + ".prototype.constructor = " + options.name + "    \n    ";
    return result;
}
function genAllRules(rules) {
    var rulesText = (0,utils/* map */.UI)(rules, function (currRule) {
        return genRule(currRule, 1);
    });
    return rulesText.join("\n");
}
function genRule(prod, n) {
    var result = indent(n, "$.RULE(\"" + prod.name + "\", function() {") + NL;
    result += genDefinition(prod.definition, n + 1);
    result += indent(n + 1, "})") + NL;
    return result;
}
function genTerminal(prod, n) {
    var name = prod.terminalType.name;
    // TODO: potential performance optimization, avoid tokenMap Dictionary access
    return indent(n, "$.CONSUME" + prod.idx + "(this.tokensMap." + name + ")" + NL);
}
function genNonTerminal(prod, n) {
    return indent(n, "$.SUBRULE" + prod.idx + "($." + prod.nonTerminalName + ")" + NL);
}
function genAlternation(prod, n) {
    var result = indent(n, "$.OR" + prod.idx + "([") + NL;
    var alts = (0,utils/* map */.UI)(prod.definition, function (altDef) { return genSingleAlt(altDef, n + 1); });
    result += alts.join("," + NL);
    result += NL + indent(n, "])" + NL);
    return result;
}
function genSingleAlt(prod, n) {
    var result = indent(n, "{") + NL;
    result += indent(n + 1, "ALT: function() {") + NL;
    result += genDefinition(prod.definition, n + 1);
    result += indent(n + 1, "}") + NL;
    result += indent(n, "}");
    return result;
}
function genProd(prod, n) {
    /* istanbul ignore else */
    if (prod instanceof NonTerminal) {
        return genNonTerminal(prod, n);
    }
    else if (prod instanceof Option) {
        return genDSLRule("OPTION", prod, n);
    }
    else if (prod instanceof RepetitionMandatory) {
        return genDSLRule("AT_LEAST_ONE", prod, n);
    }
    else if (prod instanceof RepetitionMandatoryWithSeparator) {
        return genDSLRule("AT_LEAST_ONE_SEP", prod, n);
    }
    else if (prod instanceof RepetitionWithSeparator) {
        return genDSLRule("MANY_SEP", prod, n);
    }
    else if (prod instanceof Repetition) {
        return genDSLRule("MANY", prod, n);
    }
    else if (prod instanceof Alternation) {
        return genAlternation(prod, n);
    }
    else if (prod instanceof Terminal) {
        return genTerminal(prod, n);
    }
    else if (prod instanceof Alternative) {
        return genDefinition(prod.definition, n);
    }
    else {
        throw Error("non exhaustive match");
    }
}
function genDSLRule(dslName, prod, n) {
    var result = indent(n, "$." + (dslName + prod.idx) + "(");
    if (prod.separator) {
        result += "{" + NL;
        result +=
            indent(n + 1, "SEP: this.tokensMap." + prod.separator.name) + "," + NL;
        result += "DEF: " + genDefFunction(prod.definition, n + 2) + NL;
        result += indent(n, "}") + NL;
    }
    else {
        result += genDefFunction(prod.definition, n + 1);
    }
    result += indent(n, ")") + NL;
    return result;
}
function genDefFunction(definition, n) {
    var def = "function() {" + NL;
    def += genDefinition(definition, n);
    def += indent(n, "}") + NL;
    return def;
}
function genDefinition(def, n) {
    var result = "";
    (0,utils/* forEach */.Ed)(def, function (prod) {
        result += genProd(prod, n + 1);
    });
    return result;
}
function indent(howMuch, text) {
    var spaces = Array(howMuch * 4 + 1).join(" ");
    return spaces + text;
}
//# sourceMappingURL=generate.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/generate/generate_public.js

function generateParserFactory(options) {
    var wrapperText = genWrapperFunction({
        name: options.name,
        rules: options.rules
    });
    var constructorWrapper = new Function("tokenVocabulary", "config", "chevrotain", wrapperText);
    return function (config) {
        return constructorWrapper(options.tokenVocabulary, config, 
        // TODO: check how the require is transpiled/webpacked
        __webpack_require__(3650));
    };
}
function generateParserModule(options) {
    return genUmdModule({ name: options.name, rules: options.rules });
}
//# sourceMappingURL=generate_public.js.map
;// CONCATENATED MODULE: ./node_modules/chevrotain/lib_esm/src/api.js
/* istanbul ignore file - tricky to import some things from this module during testing */
// semantic version



// Tokens utilities

// Other Utilities



// grammar reflection API

// GAST Utilities



/* istanbul ignore next */
function clearCache() {
    console.warn("The clearCache function was 'soft' removed from the Chevrotain API." +
        "\n\t It performs no action other than printing this message." +
        "\n\t Please avoid using it as it will be completely removed in the future");
}


var api_Parser = /** @class */ (function () {
    function Parser() {
        throw new Error("The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.\t\n" +
            "See: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_7-0-0");
    }
    return Parser;
}());

//# sourceMappingURL=api.js.map

/***/ }),

/***/ 5465:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cl": () => (/* binding */ cloneObj),
/* harmony export */   "Cw": () => (/* binding */ drop),
/* harmony export */   "Ed": () => (/* binding */ forEach),
/* harmony export */   "G": () => (/* binding */ some),
/* harmony export */   "HD": () => (/* binding */ isString),
/* harmony export */   "HT": () => (/* binding */ timer),
/* harmony export */   "Kj": () => (/* binding */ isRegExp),
/* harmony export */   "Kn": () => (/* binding */ isObject),
/* harmony export */   "Oq": () => (/* binding */ findAll),
/* harmony export */   "Ps": () => (/* binding */ first),
/* harmony export */   "Q8": () => (/* binding */ mapValues),
/* harmony export */   "Qw": () => (/* binding */ cloneArr),
/* harmony export */   "SV": () => (/* binding */ toFastProperties),
/* harmony export */   "TS": () => (/* binding */ merge),
/* harmony export */   "UI": () => (/* binding */ map),
/* harmony export */   "VO": () => (/* binding */ values),
/* harmony export */   "WB": () => (/* binding */ PRINT_ERROR),
/* harmony export */   "Wd": () => (/* binding */ IDENTITY),
/* harmony export */   "X0": () => (/* binding */ packArray),
/* harmony export */   "XP": () => (/* binding */ keys),
/* harmony export */   "Z$": () => (/* binding */ last),
/* harmony export */   "ce": () => (/* binding */ defaults),
/* harmony export */   "cq": () => (/* binding */ indexOf),
/* harmony export */   "d1": () => (/* binding */ reject),
/* harmony export */   "dG": () => (/* binding */ NOOP),
/* harmony export */   "dU": () => (/* binding */ isES2015MapSupported),
/* harmony export */   "e$": () => (/* binding */ has),
/* harmony export */   "e5": () => (/* binding */ difference),
/* harmony export */   "ef": () => (/* binding */ applyMixins),
/* harmony export */   "ei": () => (/* binding */ pick),
/* harmony export */   "f0": () => (/* binding */ assign),
/* harmony export */   "fj": () => (/* binding */ peek),
/* harmony export */   "hX": () => (/* binding */ filter),
/* harmony export */   "j7": () => (/* binding */ dropRight),
/* harmony export */   "jj": () => (/* binding */ uniq),
/* harmony export */   "kJ": () => (/* binding */ isArray),
/* harmony export */   "mf": () => (/* binding */ isFunction),
/* harmony export */   "o8": () => (/* binding */ isUndefined),
/* harmony export */   "oA": () => (/* binding */ compact),
/* harmony export */   "r3": () => (/* binding */ contains),
/* harmony export */   "rr": () => (/* binding */ PRINT_WARNING),
/* harmony export */   "sE": () => (/* binding */ find),
/* harmony export */   "u4": () => (/* binding */ reduce),
/* harmony export */   "vM": () => (/* binding */ groupBy),
/* harmony export */   "xH": () => (/* binding */ flatten),
/* harmony export */   "xb": () => (/* binding */ isEmpty),
/* harmony export */   "yW": () => (/* binding */ every)
/* harmony export */ });
/* unused harmony exports partial, sortBy, zipObject, assignNoOverwrite */
/*
 Utils using lodash style API. (not necessarily 100% compliant) for functional and other utils.
 These utils should replace usage of lodash in the production code base. not because they are any better...
 but for the purpose of being a dependency free library.

 The hotspots in the code are already written in imperative style for performance reasons.
 so writing several dozen utils which may be slower than the original lodash, does not matter as much
 considering they will not be invoked in hotspots...
 */
function isEmpty(arr) {
    return arr && arr.length === 0;
}
function keys(obj) {
    if (obj === undefined || obj === null) {
        return [];
    }
    return Object.keys(obj);
}
function values(obj) {
    var vals = [];
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        vals.push(obj[keys[i]]);
    }
    return vals;
}
function mapValues(obj, callback) {
    var result = [];
    var objKeys = keys(obj);
    for (var idx = 0; idx < objKeys.length; idx++) {
        var currKey = objKeys[idx];
        result.push(callback.call(null, obj[currKey], currKey));
    }
    return result;
}
function map(arr, callback) {
    var result = [];
    for (var idx = 0; idx < arr.length; idx++) {
        result.push(callback.call(null, arr[idx], idx));
    }
    return result;
}
function flatten(arr) {
    var result = [];
    for (var idx = 0; idx < arr.length; idx++) {
        var currItem = arr[idx];
        if (Array.isArray(currItem)) {
            result = result.concat(flatten(currItem));
        }
        else {
            result.push(currItem);
        }
    }
    return result;
}
function first(arr) {
    return isEmpty(arr) ? undefined : arr[0];
}
function last(arr) {
    var len = arr && arr.length;
    return len ? arr[len - 1] : undefined;
}
function forEach(collection, iteratorCallback) {
    /* istanbul ignore else */
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            iteratorCallback.call(null, collection[i], i);
        }
    }
    else if (isObject(collection)) {
        var colKeys = keys(collection);
        for (var i = 0; i < colKeys.length; i++) {
            var key = colKeys[i];
            var value = collection[key];
            iteratorCallback.call(null, value, key);
        }
    }
    else {
        throw Error("non exhaustive match");
    }
}
function isString(item) {
    return typeof item === "string";
}
function isUndefined(item) {
    return item === undefined;
}
function isFunction(item) {
    return item instanceof Function;
}
function drop(arr, howMuch) {
    if (howMuch === void 0) { howMuch = 1; }
    return arr.slice(howMuch, arr.length);
}
function dropRight(arr, howMuch) {
    if (howMuch === void 0) { howMuch = 1; }
    return arr.slice(0, arr.length - howMuch);
}
function filter(arr, predicate) {
    var result = [];
    if (Array.isArray(arr)) {
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (predicate.call(null, item)) {
                result.push(item);
            }
        }
    }
    return result;
}
function reject(arr, predicate) {
    return filter(arr, function (item) { return !predicate(item); });
}
function pick(obj, predicate) {
    var keys = Object.keys(obj);
    var result = {};
    for (var i = 0; i < keys.length; i++) {
        var currKey = keys[i];
        var currItem = obj[currKey];
        if (predicate(currItem)) {
            result[currKey] = currItem;
        }
    }
    return result;
}
function has(obj, prop) {
    if (isObject(obj)) {
        return obj.hasOwnProperty(prop);
    }
    return false;
}
function contains(arr, item) {
    return find(arr, function (currItem) { return currItem === item; }) !== undefined ? true : false;
}
/**
 * shallow clone
 */
function cloneArr(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr.push(arr[i]);
    }
    return newArr;
}
/**
 * shallow clone
 */
function cloneObj(obj) {
    var clonedObj = {};
    for (var key in obj) {
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clonedObj[key] = obj[key];
        }
    }
    return clonedObj;
}
function find(arr, predicate) {
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (predicate.call(null, item)) {
            return item;
        }
    }
    return undefined;
}
function findAll(arr, predicate) {
    var found = [];
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (predicate.call(null, item)) {
            found.push(item);
        }
    }
    return found;
}
function reduce(arrOrObj, iterator, initial) {
    var isArr = Array.isArray(arrOrObj);
    var vals = isArr ? arrOrObj : values(arrOrObj);
    var objKeys = isArr ? [] : keys(arrOrObj);
    var accumulator = initial;
    for (var i = 0; i < vals.length; i++) {
        accumulator = iterator.call(null, accumulator, vals[i], isArr ? i : objKeys[i]);
    }
    return accumulator;
}
function compact(arr) {
    return reject(arr, function (item) { return item === null || item === undefined; });
}
function uniq(arr, identity) {
    if (identity === void 0) { identity = function (item) { return item; }; }
    var identities = [];
    return reduce(arr, function (result, currItem) {
        var currIdentity = identity(currItem);
        if (contains(identities, currIdentity)) {
            return result;
        }
        else {
            identities.push(currIdentity);
            return result.concat(currItem);
        }
    }, []);
}
function partial(func) {
    var restArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restArgs[_i - 1] = arguments[_i];
    }
    var firstArg = [null];
    var allArgs = firstArg.concat(restArgs);
    return Function.bind.apply(func, allArgs);
}
function isArray(obj) {
    return Array.isArray(obj);
}
function isRegExp(obj) {
    return obj instanceof RegExp;
}
function isObject(obj) {
    return obj instanceof Object;
}
function every(arr, predicate) {
    for (var i = 0; i < arr.length; i++) {
        if (!predicate(arr[i], i)) {
            return false;
        }
    }
    return true;
}
function difference(arr, values) {
    return reject(arr, function (item) { return contains(values, item); });
}
function some(arr, predicate) {
    for (var i = 0; i < arr.length; i++) {
        if (predicate(arr[i])) {
            return true;
        }
    }
    return false;
}
function indexOf(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return i;
        }
    }
    return -1;
}
function sortBy(arr, orderFunc) {
    var result = cloneArr(arr);
    result.sort(function (a, b) { return orderFunc(a) - orderFunc(b); });
    return result;
}
function zipObject(keys, values) {
    if (keys.length !== values.length) {
        throw Error("can't zipObject with different number of keys and values!");
    }
    var result = {};
    for (var i = 0; i < keys.length; i++) {
        result[keys[i]] = values[i];
    }
    return result;
}
/**
 * mutates! (and returns) target
 */
function assign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    for (var i = 0; i < sources.length; i++) {
        var curSource = sources[i];
        var currSourceKeys = keys(curSource);
        for (var j = 0; j < currSourceKeys.length; j++) {
            var currKey = currSourceKeys[j];
            target[currKey] = curSource[currKey];
        }
    }
    return target;
}
/**
 * mutates! (and returns) target
 */
function assignNoOverwrite(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    for (var i = 0; i < sources.length; i++) {
        var curSource = sources[i];
        var currSourceKeys = keys(curSource);
        for (var j = 0; j < currSourceKeys.length; j++) {
            var currKey = currSourceKeys[j];
            if (!has(target, currKey)) {
                target[currKey] = curSource[currKey];
            }
        }
    }
    return target;
}
function defaults() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return assignNoOverwrite.apply(null, [{}].concat(sources));
}
function groupBy(arr, groupKeyFunc) {
    var result = {};
    forEach(arr, function (item) {
        var currGroupKey = groupKeyFunc(item);
        var currGroupArr = result[currGroupKey];
        if (currGroupArr) {
            currGroupArr.push(item);
        }
        else {
            result[currGroupKey] = [item];
        }
    });
    return result;
}
/**
 * Merge obj2 into obj1.
 * Will overwrite existing properties with the same name
 */
function merge(obj1, obj2) {
    var result = cloneObj(obj1);
    var keys2 = keys(obj2);
    for (var i = 0; i < keys2.length; i++) {
        var key = keys2[i];
        var value = obj2[key];
        result[key] = value;
    }
    return result;
}
function NOOP() { }
function IDENTITY(item) {
    return item;
}
/**
 * Will return a new packed array with same values.
 */
function packArray(holeyArr) {
    var result = [];
    for (var i = 0; i < holeyArr.length; i++) {
        var orgValue = holeyArr[i];
        result.push(orgValue !== undefined ? orgValue : undefined);
    }
    return result;
}
function PRINT_ERROR(msg) {
    /* istanbul ignore else - can't override global.console in node.js */
    if (console && console.error) {
        console.error("Error: " + msg);
    }
}
function PRINT_WARNING(msg) {
    /* istanbul ignore else - can't override global.console in node.js*/
    if (console && console.warn) {
        // TODO: modify docs accordingly
        console.warn("Warning: " + msg);
    }
}
function isES2015MapSupported() {
    return typeof Map === "function";
}
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        var baseProto = baseCtor.prototype;
        Object.getOwnPropertyNames(baseProto).forEach(function (propName) {
            if (propName === "constructor") {
                return;
            }
            var basePropDescriptor = Object.getOwnPropertyDescriptor(baseProto, propName);
            // Handle Accessors
            if (basePropDescriptor &&
                (basePropDescriptor.get || basePropDescriptor.set)) {
                Object.defineProperty(derivedCtor.prototype, propName, basePropDescriptor);
            }
            else {
                derivedCtor.prototype[propName] = baseCtor.prototype[propName];
            }
        });
    });
}
// base on: https://github.com/petkaantonov/bluebird/blob/b97c0d2d487e8c5076e8bd897e0dcd4622d31846/src/util.js#L201-L216
function toFastProperties(toBecomeFast) {
    function FakeConstructor() { }
    // If our object is used as a constructor it would receive
    FakeConstructor.prototype = toBecomeFast;
    var fakeInstance = new FakeConstructor();
    function fakeAccess() {
        return typeof fakeInstance.bar;
    }
    // help V8 understand this is a "real" prototype by actually using
    // the fake instance.
    fakeAccess();
    fakeAccess();
    return toBecomeFast;
    // Eval prevents optimization of this method (even though this is dead code)
    /* istanbul ignore next */
    // tslint:disable-next-line
    eval(toBecomeFast);
}
function peek(arr) {
    return arr[arr.length - 1];
}
/* istanbul ignore next - for performance tracing*/
function timer(func) {
    var start = new Date().getTime();
    var val = func();
    var end = new Date().getTime();
    var total = end - start;
    return { time: total, value: val };
}
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 6486:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used as the semantic version number. */
  var VERSION = '4.17.21';

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Error message constants. */
  var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
      FUNC_ERROR_TEXT = 'Expected a function',
      INVALID_TEMPL_VAR_ERROR_TEXT = 'Invalid `variable` option passed into `_.template`';

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER = '__lodash_placeholder__';

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG = 4;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG = 1,
      WRAP_BIND_KEY_FLAG = 2,
      WRAP_CURRY_BOUND_FLAG = 4,
      WRAP_CURRY_FLAG = 8,
      WRAP_CURRY_RIGHT_FLAG = 16,
      WRAP_PARTIAL_FLAG = 32,
      WRAP_PARTIAL_RIGHT_FLAG = 64,
      WRAP_ARY_FLAG = 128,
      WRAP_REARG_FLAG = 256,
      WRAP_FLIP_FLAG = 512;

  /** Used as default options for `_.truncate`. */
  var DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMISSION = '...';

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /** Used to indicate the type of lazy iteratees. */
  var LAZY_FILTER_FLAG = 1,
      LAZY_MAP_FLAG = 2,
      LAZY_WHILE_FLAG = 3;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0,
      MAX_SAFE_INTEGER = 9007199254740991,
      MAX_INTEGER = 1.7976931348623157e+308,
      NAN = 0 / 0;

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = 4294967295,
      MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
      HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

  /** Used to associate wrap methods with their bit flags. */
  var wrapFlags = [
    ['ary', WRAP_ARY_FLAG],
    ['bind', WRAP_BIND_FLAG],
    ['bindKey', WRAP_BIND_KEY_FLAG],
    ['curry', WRAP_CURRY_FLAG],
    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
    ['flip', WRAP_FLIP_FLAG],
    ['partial', WRAP_PARTIAL_FLAG],
    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
    ['rearg', WRAP_REARG_FLAG]
  ];

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      asyncTag = '[object AsyncFunction]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      domExcTag = '[object DOMException]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      nullTag = '[object Null]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      proxyTag = '[object Proxy]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      undefinedTag = '[object Undefined]',
      weakMapTag = '[object WeakMap]',
      weakSetTag = '[object WeakSet]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to match empty string literals in compiled template source. */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /** Used to match HTML entities and HTML characters. */
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
      reUnescapedHtml = /[&<>"']/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source),
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  /** Used to match template delimiters. */
  var reEscape = /<%-([\s\S]+?)%>/g,
      reEvaluate = /<%([\s\S]+?)%>/g,
      reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
      reHasRegExpChar = RegExp(reRegExpChar.source);

  /** Used to match leading whitespace. */
  var reTrimStart = /^\s+/;

  /** Used to match a single whitespace character. */
  var reWhitespace = /\s/;

  /** Used to match wrap detail comments. */
  var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
      reSplitDetails = /,? & /;

  /** Used to match words composed of alphanumeric characters. */
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

  /**
   * Used to validate the `validate` option in `_.template` variable.
   *
   * Forbids characters which could potentially change the meaning of the function argument definition:
   * - "()," (modification of function parameters)
   * - "=" (default value)
   * - "[]{}" (destructuring of function parameters)
   * - "/" (beginning of a comment)
   * - whitespace
   */
  var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Used to match
   * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
   */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /** Used to match Latin Unicode letters (excluding mathematical operators). */
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

  /** Used to ensure capturing order of template delimiters. */
  var reNoMatch = /($^)/;

  /** Used to match unescaped characters in compiled string literals. */
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

  /** Used to compose unicode character classes. */
  var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange = '\\u0300-\\u036f',
      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange = '\\u20d0-\\u20ff',
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
      rsDingbatRange = '\\u2700-\\u27bf',
      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
      rsPunctuationRange = '\\u2000-\\u206f',
      rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
      rsVarRange = '\\ufe0e\\ufe0f',
      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

  /** Used to compose unicode capture groups. */
  var rsApos = "['\u2019]",
      rsAstral = '[' + rsAstralRange + ']',
      rsBreak = '[' + rsBreakRange + ']',
      rsCombo = '[' + rsComboRange + ']',
      rsDigits = '\\d+',
      rsDingbat = '[' + rsDingbatRange + ']',
      rsLower = '[' + rsLowerRange + ']',
      rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsUpper = '[' + rsUpperRange + ']',
      rsZWJ = '\\u200d';

  /** Used to compose unicode regexes. */
  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
      reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange + ']?',
      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
      rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

  /** Used to match apostrophes. */
  var reApos = RegExp(rsApos, 'g');

  /**
   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
   */
  var reComboMark = RegExp(rsCombo, 'g');

  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

  /** Used to match complex or compound words. */
  var reUnicodeWord = RegExp([
    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
    rsUpper + '+' + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
  ].join('|'), 'g');

  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

  /** Used to detect strings that need a more robust regexp to match words. */
  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

  /** Used to assign default `context` object properties. */
  var contextProps = [
    'Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array',
    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object',
    'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array',
    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap',
    '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'
  ];

  /** Used to make template sourceURLs easier to identify. */
  var templateCounter = -1;

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
  cloneableTags[boolTag] = cloneableTags[dateTag] =
  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  cloneableTags[int32Tag] = cloneableTags[mapTag] =
  cloneableTags[numberTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = cloneableTags[setTag] =
  cloneableTags[stringTag] = cloneableTags[symbolTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[weakMapTag] = false;

  /** Used to map Latin Unicode letters to basic Latin letters. */
  var deburredLetters = {
    // Latin-1 Supplement block.
    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C',  '\xe7': 'c',
    '\xd0': 'D',  '\xf0': 'd',
    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N',  '\xf1': 'n',
    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss',
    // Latin Extended-A block.
    '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
    '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
    '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
    '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
    '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
    '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
    '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
    '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
    '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
    '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
    '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
    '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
    '\u0134': 'J',  '\u0135': 'j',
    '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
    '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
    '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
    '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
    '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
    '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
    '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
    '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
    '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
    '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
    '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
    '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
    '\u0163': 't',  '\u0165': 't', '\u0167': 't',
    '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
    '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
    '\u0174': 'W',  '\u0175': 'w',
    '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
    '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
    '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
    '\u0132': 'IJ', '\u0133': 'ij',
    '\u0152': 'Oe', '\u0153': 'oe',
    '\u0149': "'n", '\u017f': 's'
  };

  /** Used to map characters to HTML entities. */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  /** Used to map HTML entities to characters. */
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };

  /** Used to escape characters for inclusion in compiled string literals. */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Built-in method references without a dependency on `root`. */
  var freeParseFloat = parseFloat,
      freeParseInt = parseInt;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Detect free variable `exports`. */
  var freeExports =  true && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  /* Node.js helper references. */
  var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
      nodeIsDate = nodeUtil && nodeUtil.isDate,
      nodeIsMap = nodeUtil && nodeUtil.isMap,
      nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
      nodeIsSet = nodeUtil && nodeUtil.isSet,
      nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /*--------------------------------------------------------------------------*/

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /**
   * A specialized version of `baseAggregator` for arrays.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform keys.
   * @param {Object} accumulator The initial aggregated object.
   * @returns {Function} Returns `accumulator`.
   */
  function arrayAggregator(array, setter, iteratee, accumulator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      var value = array[index];
      setter(accumulator, value, iteratee(value), array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.forEachRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEachRight(array, iteratee) {
    var length = array == null ? 0 : array.length;

    while (length--) {
      if (iteratee(array[length], length, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.every` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   */
  function arrayEvery(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (!predicate(array[index], index, array)) {
        return false;
      }
    }
    return true;
  }

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && baseIndexOf(array, value, 0) > -1;
  }

  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludesWith(array, value, comparator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  /**
   * A specialized version of `_.reduce` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the first element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1,
        length = array == null ? 0 : array.length;

    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.reduceRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the last element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduceRight(array, iteratee, accumulator, initAccum) {
    var length = array == null ? 0 : array.length;
    if (initAccum && length) {
      accumulator = array[--length];
    }
    while (length--) {
      accumulator = iteratee(accumulator, array[length], length, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Gets the size of an ASCII `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  var asciiSize = baseProperty('length');

  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function asciiToArray(string) {
    return string.split('');
  }

  /**
   * Splits an ASCII `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function asciiWords(string) {
    return string.match(reAsciiWord) || [];
  }

  /**
   * The base implementation of methods like `_.findKey` and `_.findLastKey`,
   * without support for iteratee shorthands, which iterates over `collection`
   * using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the found element or its key, else `undefined`.
   */
  function baseFindKey(collection, predicate, eachFunc) {
    var result;
    eachFunc(collection, function(value, key, collection) {
      if (predicate(value, key, collection)) {
        result = key;
        return false;
      }
    });
    return result;
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    return value === value
      ? strictIndexOf(array, value, fromIndex)
      : baseFindIndex(array, baseIsNaN, fromIndex);
  }

  /**
   * This function is like `baseIndexOf` except that it accepts a comparator.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOfWith(array, value, fromIndex, comparator) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (comparator(array[index], value)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */
  function baseIsNaN(value) {
    return value !== value;
  }

  /**
   * The base implementation of `_.mean` and `_.meanBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the mean.
   */
  function baseMean(array, iteratee) {
    var length = array == null ? 0 : array.length;
    return length ? (baseSum(array, iteratee) / length) : NAN;
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.propertyOf` without support for deep paths.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyOf(object) {
    return function(key) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.reduce` and `_.reduceRight`, without support
   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} accumulator The initial value.
   * @param {boolean} initAccum Specify using the first or last element of
   *  `collection` as the initial value.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the accumulated value.
   */
  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
    eachFunc(collection, function(value, index, collection) {
      accumulator = initAccum
        ? (initAccum = false, value)
        : iteratee(accumulator, value, index, collection);
    });
    return accumulator;
  }

  /**
   * The base implementation of `_.sortBy` which uses `comparer` to define the
   * sort order of `array` and replaces criteria objects with their corresponding
   * values.
   *
   * @private
   * @param {Array} array The array to sort.
   * @param {Function} comparer The function to define sort order.
   * @returns {Array} Returns `array`.
   */
  function baseSortBy(array, comparer) {
    var length = array.length;

    array.sort(comparer);
    while (length--) {
      array[length] = array[length].value;
    }
    return array;
  }

  /**
   * The base implementation of `_.sum` and `_.sumBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the sum.
   */
  function baseSum(array, iteratee) {
    var result,
        index = -1,
        length = array.length;

    while (++index < length) {
      var current = iteratee(array[index]);
      if (current !== undefined) {
        result = result === undefined ? current : (result + current);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /**
   * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
   * of key-value pairs for `object` corresponding to the property names of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the key-value pairs.
   */
  function baseToPairs(object, props) {
    return arrayMap(props, function(key) {
      return [key, object[key]];
    });
  }

  /**
   * The base implementation of `_.trim`.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} Returns the trimmed string.
   */
  function baseTrim(string) {
    return string
      ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
      : string;
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, props) {
    return arrayMap(props, function(key) {
      return object[key];
    });
  }

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  /**
   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the first unmatched string symbol.
   */
  function charsStartIndex(strSymbols, chrSymbols) {
    var index = -1,
        length = strSymbols.length;

    while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the last unmatched string symbol.
   */
  function charsEndIndex(strSymbols, chrSymbols) {
    var index = strSymbols.length;

    while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Gets the number of `placeholder` occurrences in `array`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} placeholder The placeholder to search for.
   * @returns {number} Returns the placeholder count.
   */
  function countHolders(array, placeholder) {
    var length = array.length,
        result = 0;

    while (length--) {
      if (array[length] === placeholder) {
        ++result;
      }
    }
    return result;
  }

  /**
   * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
   * letters to basic Latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
  var deburrLetter = basePropertyOf(deburredLetters);

  /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  var escapeHtmlChar = basePropertyOf(htmlEscapes);

  /**
   * Used by `_.template` to escape characters for inclusion in compiled string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }

  /**
   * Checks if `string` contains a word composed of Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a word is found, else `false`.
   */
  function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
  }

  /**
   * Converts `iterator` to an array.
   *
   * @private
   * @param {Object} iterator The iterator to convert.
   * @returns {Array} Returns the converted array.
   */
  function iteratorToArray(iterator) {
    var data,
        result = [];

    while (!(data = iterator.next()).done) {
      result.push(data.value);
    }
    return result;
  }

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (value === placeholder || value === PLACEHOLDER) {
        array[index] = PLACEHOLDER;
        result[resIndex++] = index;
      }
    }
    return result;
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  /**
   * Converts `set` to its value-value pairs.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the value-value pairs.
   */
  function setToPairs(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = [value, value];
    });
    return result;
  }

  /**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * A specialized version of `_.lastIndexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictLastIndexOf(array, value, fromIndex) {
    var index = fromIndex + 1;
    while (index--) {
      if (array[index] === value) {
        return index;
      }
    }
    return index;
  }

  /**
   * Gets the number of symbols in `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the string size.
   */
  function stringSize(string) {
    return hasUnicode(string)
      ? unicodeSize(string)
      : asciiSize(string);
  }

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function stringToArray(string) {
    return hasUnicode(string)
      ? unicodeToArray(string)
      : asciiToArray(string);
  }

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
  function trimmedEndIndex(string) {
    var index = string.length;

    while (index-- && reWhitespace.test(string.charAt(index))) {}
    return index;
  }

  /**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
  var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

  /**
   * Gets the size of a Unicode `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  function unicodeSize(string) {
    var result = reUnicode.lastIndex = 0;
    while (reUnicode.test(string)) {
      ++result;
    }
    return result;
  }

  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }

  /**
   * Splits a Unicode `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new pristine `lodash` function using the `context` object.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Util
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns a new `lodash` function.
   * @example
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunction(_.foo);
   * // => true
   * _.isFunction(_.bar);
   * // => false
   *
   * lodash.isFunction(lodash.foo);
   * // => false
   * lodash.isFunction(lodash.bar);
   * // => true
   *
   * // Create a suped-up `defer` in Node.js.
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */
  var runInContext = (function runInContext(context) {
    context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));

    /** Built-in constructor references. */
    var Array = context.Array,
        Date = context.Date,
        Error = context.Error,
        Function = context.Function,
        Math = context.Math,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /** Used for built-in method references. */
    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = context['__core-js_shared__'];

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to generate unique IDs. */
    var idCounter = 0;

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);

    /** Used to restore the original `_` reference in `_.noConflict`. */
    var oldDash = root._;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Built-in value references. */
    var Buffer = moduleExports ? context.Buffer : undefined,
        Symbol = context.Symbol,
        Uint8Array = context.Uint8Array,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
        getPrototype = overArg(Object.getPrototypeOf, Object),
        objectCreate = Object.create,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice,
        spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
        symIterator = Symbol ? Symbol.iterator : undefined,
        symToStringTag = Symbol ? Symbol.toStringTag : undefined;

    var defineProperty = (function() {
      try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }());

    /** Mocked built-ins. */
    var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
        ctxNow = Date && Date.now !== root.Date.now && Date.now,
        ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeCeil = Math.ceil,
        nativeFloor = Math.floor,
        nativeGetSymbols = Object.getOwnPropertySymbols,
        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
        nativeIsFinite = context.isFinite,
        nativeJoin = arrayProto.join,
        nativeKeys = overArg(Object.keys, Object),
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeNow = Date.now,
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random,
        nativeReverse = arrayProto.reverse;

    /* Built-in method references that are verified to be native. */
    var DataView = getNative(context, 'DataView'),
        Map = getNative(context, 'Map'),
        Promise = getNative(context, 'Promise'),
        Set = getNative(context, 'Set'),
        WeakMap = getNative(context, 'WeakMap'),
        nativeCreate = getNative(Object, 'create');

    /** Used to store function metadata. */
    var metaMap = WeakMap && new WeakMap;

    /** Used to lookup unminified function names. */
    var realNames = {};

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol ? Symbol.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps `value` to enable implicit method
     * chain sequences. Methods that operate on and return arrays, collections,
     * and functions can be chained together. Methods that retrieve a single value
     * or may return a primitive value will automatically end the chain sequence
     * and return the unwrapped value. Otherwise, the value must be unwrapped
     * with `_#value`.
     *
     * Explicit chain sequences, which must be unwrapped with `_#value`, may be
     * enabled using `_.chain`.
     *
     * The execution of chained methods is lazy, that is, it's deferred until
     * `_#value` is implicitly or explicitly called.
     *
     * Lazy evaluation allows several methods to support shortcut fusion.
     * Shortcut fusion is an optimization to merge iteratee calls; this avoids
     * the creation of intermediate arrays and can greatly reduce the number of
     * iteratee executions. Sections of a chain sequence qualify for shortcut
     * fusion if the section is applied to an array and iteratees accept only
     * one argument. The heuristic for whether a section qualifies for shortcut
     * fusion is subject to change.
     *
     * Chaining is supported in custom builds as long as the `_#value` method is
     * directly or indirectly included in the build.
     *
     * In addition to lodash methods, wrappers have `Array` and `String` methods.
     *
     * The wrapper `Array` methods are:
     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
     *
     * The wrapper `String` methods are:
     * `replace` and `split`
     *
     * The wrapper methods that support shortcut fusion are:
     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
     *
     * The chainable wrapper methods are:
     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
     * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
     * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
     * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
     * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
     * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
     * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
     * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
     * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
     * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
     * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
     * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
     * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
     * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
     * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
     * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
     * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
     * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
     * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
     * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
     * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
     * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
     * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
     * `zipObject`, `zipObjectDeep`, and `zipWith`
     *
     * The wrapper methods that are **not** chainable by default are:
     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
     * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
     * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
     * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
     * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
     * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
     * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
     * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
     * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
     * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
     * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
     * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
     * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
     * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
     * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
     * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
     * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
     * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
     * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
     * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
     * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
     * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
     * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
     * `upperFirst`, `value`, and `words`
     *
     * @name _
     * @constructor
     * @category Seq
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // Returns an unwrapped value.
     * wrapped.reduce(_.add);
     * // => 6
     *
     * // Returns a wrapped value.
     * var squares = wrapped.map(square);
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
        if (value instanceof LodashWrapper) {
          return value;
        }
        if (hasOwnProperty.call(value, '__wrapped__')) {
          return wrapperClone(value);
        }
      }
      return new LodashWrapper(value);
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} proto The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = (function() {
      function object() {}
      return function(proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object;
        object.prototype = undefined;
        return result;
      };
    }());

    /**
     * The function whose prototype chain sequence wrappers inherit from.
     *
     * @private
     */
    function baseLodash() {
      // No operation performed.
    }

    /**
     * The base constructor for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap.
     * @param {boolean} [chainAll] Enable explicit method chain sequences.
     */
    function LodashWrapper(value, chainAll) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__chain__ = !!chainAll;
      this.__index__ = 0;
      this.__values__ = undefined;
    }

    /**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB) as well as ES2015 template strings. Change the
     * following template settings to use alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type {Object}
     */
    lodash.templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'escape': reEscape,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'evaluate': reEvaluate,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'interpolate': reInterpolate,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type {string}
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type {Object}
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type {Function}
         */
        '_': lodash
      }
    };

    // Ensure wrappers are instances of `baseLodash`.
    lodash.prototype = baseLodash.prototype;
    lodash.prototype.constructor = lodash;

    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
     *
     * @private
     * @constructor
     * @param {*} value The value to wrap.
     */
    function LazyWrapper(value) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__dir__ = 1;
      this.__filtered__ = false;
      this.__iteratees__ = [];
      this.__takeCount__ = MAX_ARRAY_LENGTH;
      this.__views__ = [];
    }

    /**
     * Creates a clone of the lazy wrapper object.
     *
     * @private
     * @name clone
     * @memberOf LazyWrapper
     * @returns {Object} Returns the cloned `LazyWrapper` object.
     */
    function lazyClone() {
      var result = new LazyWrapper(this.__wrapped__);
      result.__actions__ = copyArray(this.__actions__);
      result.__dir__ = this.__dir__;
      result.__filtered__ = this.__filtered__;
      result.__iteratees__ = copyArray(this.__iteratees__);
      result.__takeCount__ = this.__takeCount__;
      result.__views__ = copyArray(this.__views__);
      return result;
    }

    /**
     * Reverses the direction of lazy iteration.
     *
     * @private
     * @name reverse
     * @memberOf LazyWrapper
     * @returns {Object} Returns the new reversed `LazyWrapper` object.
     */
    function lazyReverse() {
      if (this.__filtered__) {
        var result = new LazyWrapper(this);
        result.__dir__ = -1;
        result.__filtered__ = true;
      } else {
        result = this.clone();
        result.__dir__ *= -1;
      }
      return result;
    }

    /**
     * Extracts the unwrapped value from its lazy wrapper.
     *
     * @private
     * @name value
     * @memberOf LazyWrapper
     * @returns {*} Returns the unwrapped value.
     */
    function lazyValue() {
      var array = this.__wrapped__.value(),
          dir = this.__dir__,
          isArr = isArray(array),
          isRight = dir < 0,
          arrLength = isArr ? array.length : 0,
          view = getView(0, arrLength, this.__views__),
          start = view.start,
          end = view.end,
          length = end - start,
          index = isRight ? end : (start - 1),
          iteratees = this.__iteratees__,
          iterLength = iteratees.length,
          resIndex = 0,
          takeCount = nativeMin(length, this.__takeCount__);

      if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
        return baseWrapperValue(array, this.__actions__);
      }
      var result = [];

      outer:
      while (length-- && resIndex < takeCount) {
        index += dir;

        var iterIndex = -1,
            value = array[index];

        while (++iterIndex < iterLength) {
          var data = iteratees[iterIndex],
              iteratee = data.iteratee,
              type = data.type,
              computed = iteratee(value);

          if (type == LAZY_MAP_FLAG) {
            value = computed;
          } else if (!computed) {
            if (type == LAZY_FILTER_FLAG) {
              continue outer;
            } else {
              break outer;
            }
          }
        }
        result[resIndex++] = value;
      }
      return result;
    }

    // Ensure `LazyWrapper` is an instance of `baseLodash`.
    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
    LazyWrapper.prototype.constructor = LazyWrapper;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
    }

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
      return this;
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map || ListCache),
        'string': new Hash
      };
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /*------------------------------------------------------------------------*/

    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var index = -1,
          length = values == null ? 0 : values.length;

      this.__data__ = new MapCache;
      while (++index < length) {
        this.add(values[index]);
      }
    }

    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }

    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */
    function setCacheHas(value) {
      return this.__data__.has(value);
    }

    // Add methods to `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new ListCache;
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);

      this.size = data.size;
      return result;
    }

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.sample` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @returns {*} Returns the random element.
     */
    function arraySample(array) {
      var length = array.length;
      return length ? array[baseRandom(0, length - 1)] : undefined;
    }

    /**
     * A specialized version of `_.sampleSize` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */
    function arraySampleSize(array, n) {
      return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
    }

    /**
     * A specialized version of `_.shuffle` for arrays.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */
    function arrayShuffle(array) {
      return shuffleSelf(copyArray(array));
    }

    /**
     * This function is like `assignValue` except that it doesn't assign
     * `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignMergeValue(object, key, value) {
      if ((value !== undefined && !eq(object[key], value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * Aggregates elements of `collection` on `accumulator` with keys transformed
     * by `iteratee` and values set by `setter`.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform keys.
     * @param {Object} accumulator The initial aggregated object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseAggregator(collection, setter, iteratee, accumulator) {
      baseEach(collection, function(value, key, collection) {
        setter(accumulator, value, iteratee(value), collection);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }

    /**
     * The base implementation of `_.assignIn` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssignIn(object, source) {
      return object && copyObject(source, keysIn(source), object);
    }

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && defineProperty) {
        defineProperty(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    /**
     * The base implementation of `_.at` without support for individual paths.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {string[]} paths The property paths to pick.
     * @returns {Array} Returns the picked elements.
     */
    function baseAt(object, paths) {
      var index = -1,
          length = paths.length,
          result = Array(length),
          skip = object == null;

      while (++index < length) {
        result[index] = skip ? undefined : get(object, paths[index]);
      }
      return result;
    }

    /**
     * The base implementation of `_.clamp` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     */
    function baseClamp(number, lower, upper) {
      if (number === number) {
        if (upper !== undefined) {
          number = number <= upper ? number : upper;
        }
        if (lower !== undefined) {
          number = number >= lower ? number : lower;
        }
      }
      return number;
    }

    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Deep clone
     *  2 - Flatten inherited properties
     *  4 - Clone symbols
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result,
          isDeep = bitmask & CLONE_DEEP_FLAG,
          isFlat = bitmask & CLONE_FLAT_FLAG,
          isFull = bitmask & CLONE_SYMBOLS_FLAG;

      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value),
            isFunc = tag == funcTag || tag == genTag;

        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          result = (isFlat || isFunc) ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat
              ? copySymbolsIn(value, baseAssignIn(result, value))
              : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, isDeep);
        }
      }
      // Check for circular references and return its corresponding clone.
      stack || (stack = new Stack);
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);

      if (isSet(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
      } else if (isMap(value)) {
        value.forEach(function(subValue, key) {
          result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });
      }

      var keysFunc = isFull
        ? (isFlat ? getAllKeysIn : getAllKeys)
        : (isFlat ? keysIn : keys);

      var props = isArr ? undefined : keysFunc(value);
      arrayEach(props || value, function(subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
      return result;
    }

    /**
     * The base implementation of `_.conforms` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     */
    function baseConforms(source) {
      var props = keys(source);
      return function(object) {
        return baseConformsTo(object, source, props);
      };
    }

    /**
     * The base implementation of `_.conformsTo` which accepts `props` to check.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     */
    function baseConformsTo(object, source, props) {
      var length = props.length;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (length--) {
        var key = props[length],
            predicate = source[key],
            value = object[key];

        if ((value === undefined && !(key in object)) || !predicate(value)) {
          return false;
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.delay` and `_.defer` which accepts `args`
     * to provide to `func`.
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {Array} args The arguments to provide to `func`.
     * @returns {number|Object} Returns the timer id or timeout object.
     */
    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function() { func.apply(undefined, args); }, wait);
    }

    /**
     * The base implementation of methods like `_.difference` without support
     * for excluding multiple arrays or iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     */
    function baseDifference(array, values, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          isCommon = true,
          length = array.length,
          result = [],
          valuesLength = values.length;

      if (!length) {
        return result;
      }
      if (iteratee) {
        values = arrayMap(values, baseUnary(iteratee));
      }
      if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
      }
      else if (values.length >= LARGE_ARRAY_SIZE) {
        includes = cacheHas;
        isCommon = false;
        values = new SetCache(values);
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee == null ? value : iteratee(value);

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values[valuesIndex] === computed) {
              continue outer;
            }
          }
          result.push(value);
        }
        else if (!includes(values, computed, comparator)) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.forEach` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEach = createBaseEach(baseForOwn);

    /**
     * The base implementation of `_.forEachRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEachRight = createBaseEach(baseForOwnRight, true);

    /**
     * The base implementation of `_.every` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`
     */
    function baseEvery(collection, predicate) {
      var result = true;
      baseEach(collection, function(value, index, collection) {
        result = !!predicate(value, index, collection);
        return result;
      });
      return result;
    }

    /**
     * The base implementation of methods like `_.max` and `_.min` which accepts a
     * `comparator` to determine the extremum value.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The iteratee invoked per iteration.
     * @param {Function} comparator The comparator used to compare values.
     * @returns {*} Returns the extremum value.
     */
    function baseExtremum(array, iteratee, comparator) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        var value = array[index],
            current = iteratee(value);

        if (current != null && (computed === undefined
              ? (current === current && !isSymbol(current))
              : comparator(current, computed)
            )) {
          var computed = current,
              result = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.fill` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     */
    function baseFill(array, value, start, end) {
      var length = array.length;

      start = toInteger(start);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined || end > length) ? length : toInteger(end);
      if (end < 0) {
        end += length;
      }
      end = start > end ? 0 : toLength(end);
      while (start < end) {
        array[start++] = value;
      }
      return array;
    }

    /**
     * The base implementation of `_.filter` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1,
          length = array.length;

      predicate || (predicate = isFlattenable);
      result || (result = []);

      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            // Recursively flatten arrays (susceptible to call stack limits).
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    /**
     * This function is like `baseFor` except that it iterates over properties
     * in the opposite order.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseForRight = createBaseFor(true);

    /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwnRight(object, iteratee) {
      return object && baseForRight(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from `props`.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the function names.
     */
    function baseFunctions(object, props) {
      return arrayFilter(props, function(key) {
        return isFunction(object[key]);
      });
    }

    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path) {
      path = castPath(path, object);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    }

    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value);
    }

    /**
     * The base implementation of `_.gt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     */
    function baseGt(value, other) {
      return value > other;
    }

    /**
     * The base implementation of `_.has` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHas(object, key) {
      return object != null && hasOwnProperty.call(object, key);
    }

    /**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }

    /**
     * The base implementation of `_.inRange` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to check.
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     */
    function baseInRange(number, start, end) {
      return number >= nativeMin(start, end) && number < nativeMax(start, end);
    }

    /**
     * The base implementation of methods like `_.intersection`, without support
     * for iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of shared values.
     */
    function baseIntersection(arrays, iteratee, comparator) {
      var includes = comparator ? arrayIncludesWith : arrayIncludes,
          length = arrays[0].length,
          othLength = arrays.length,
          othIndex = othLength,
          caches = Array(othLength),
          maxLength = Infinity,
          result = [];

      while (othIndex--) {
        var array = arrays[othIndex];
        if (othIndex && iteratee) {
          array = arrayMap(array, baseUnary(iteratee));
        }
        maxLength = nativeMin(array.length, maxLength);
        caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
          ? new SetCache(othIndex && array)
          : undefined;
      }
      array = arrays[0];

      var index = -1,
          seen = caches[0];

      outer:
      while (++index < length && result.length < maxLength) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (!(seen
              ? cacheHas(seen, computed)
              : includes(result, computed, comparator)
            )) {
          othIndex = othLength;
          while (--othIndex) {
            var cache = caches[othIndex];
            if (!(cache
                  ? cacheHas(cache, computed)
                  : includes(arrays[othIndex], computed, comparator))
                ) {
              continue outer;
            }
          }
          if (seen) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.invert` and `_.invertBy` which inverts
     * `object` with values transformed by `iteratee` and set by `setter`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform values.
     * @param {Object} accumulator The initial inverted object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseInverter(object, setter, iteratee, accumulator) {
      baseForOwn(object, function(value, key, object) {
        setter(accumulator, iteratee(value), key, object);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.invoke` without support for individual
     * method arguments.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {Array} args The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     */
    function baseInvoke(object, path, args) {
      path = castPath(path, object);
      object = parent(object, path);
      var func = object == null ? object : object[toKey(last(path))];
      return func == null ? undefined : apply(func, object, args);
    }

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }

    /**
     * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     */
    function baseIsArrayBuffer(value) {
      return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
    }

    /**
     * The base implementation of `_.isDate` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     */
    function baseIsDate(value) {
      return isObjectLike(value) && baseGetTag(value) == dateTag;
    }

    /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Unordered comparison
     *  2 - Partial comparison
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = objIsArr ? arrayTag : getTag(object),
          othTag = othIsArr ? arrayTag : getTag(other);

      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;

      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;

      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack);
        return (objIsArr || isTypedArray(object))
          ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
          : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;

          stack || (stack = new Stack);
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack);
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }

    /**
     * The base implementation of `_.isMap` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     */
    function baseIsMap(value) {
      return isObjectLike(value) && getTag(value) == mapTag;
    }

    /**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack;
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === undefined
                ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
                : result
              )) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * The base implementation of `_.isRegExp` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     */
    function baseIsRegExp(value) {
      return isObjectLike(value) && baseGetTag(value) == regexpTag;
    }

    /**
     * The base implementation of `_.isSet` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     */
    function baseIsSet(value) {
      return isObjectLike(value) && getTag(value) == setTag;
    }

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }

    /**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */
    function baseIteratee(value) {
      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
      if (typeof value == 'function') {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == 'object') {
        return isArray(value)
          ? baseMatchesProperty(value[0], value[1])
          : baseMatches(value);
      }
      return property(value);
    }

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.lt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     */
    function baseLt(value, other) {
      return value < other;
    }

    /**
     * The base implementation of `_.map` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }

    /**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }

    /**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return (objValue === undefined && objValue === srcValue)
          ? hasIn(object, path)
          : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }

    /**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      baseFor(source, function(srcValue, key) {
        stack || (stack = new Stack);
        if (isObject(srcValue)) {
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        }
        else {
          var newValue = customizer
            ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
            : undefined;

          if (newValue === undefined) {
            newValue = srcValue;
          }
          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }

    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = safeGet(object, key),
          srcValue = safeGet(source, key),
          stacked = stack.get(srcValue);

      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer
        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
        : undefined;

      var isCommon = newValue === undefined;

      if (isCommon) {
        var isArr = isArray(srcValue),
            isBuff = !isArr && isBuffer(srcValue),
            isTyped = !isArr && !isBuff && isTypedArray(srcValue);

        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          }
          else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          }
          else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          }
          else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          }
          else {
            newValue = [];
          }
        }
        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          }
          else if (!isObject(objValue) || isFunction(objValue)) {
            newValue = initCloneObject(srcValue);
          }
        }
        else {
          isCommon = false;
        }
      }
      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }

    /**
     * The base implementation of `_.nth` which doesn't coerce arguments.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {number} n The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     */
    function baseNth(array, n) {
      var length = array.length;
      if (!length) {
        return;
      }
      n += n < 0 ? length : 0;
      return isIndex(n, length) ? array[n] : undefined;
    }

    /**
     * The base implementation of `_.orderBy` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {string[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */
    function baseOrderBy(collection, iteratees, orders) {
      if (iteratees.length) {
        iteratees = arrayMap(iteratees, function(iteratee) {
          if (isArray(iteratee)) {
            return function(value) {
              return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
            }
          }
          return iteratee;
        });
      } else {
        iteratees = [identity];
      }

      var index = -1;
      iteratees = arrayMap(iteratees, baseUnary(getIteratee()));

      var result = baseMap(collection, function(value, key, collection) {
        var criteria = arrayMap(iteratees, function(iteratee) {
          return iteratee(value);
        });
        return { 'criteria': criteria, 'index': ++index, 'value': value };
      });

      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }

    /**
     * The base implementation of `_.pick` without support for individual
     * property identifiers.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @returns {Object} Returns the new object.
     */
    function basePick(object, paths) {
      return basePickBy(object, paths, function(value, path) {
        return hasIn(object, path);
      });
    }

    /**
     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @param {Function} predicate The function invoked per property.
     * @returns {Object} Returns the new object.
     */
    function basePickBy(object, paths, predicate) {
      var index = -1,
          length = paths.length,
          result = {};

      while (++index < length) {
        var path = paths[index],
            value = baseGet(object, path);

        if (predicate(value, path)) {
          baseSet(result, castPath(path, object), value);
        }
      }
      return result;
    }

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }

    /**
     * The base implementation of `_.pullAllBy` without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     */
    function basePullAll(array, values, iteratee, comparator) {
      var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
          index = -1,
          length = values.length,
          seen = array;

      if (array === values) {
        values = copyArray(values);
      }
      if (iteratee) {
        seen = arrayMap(array, baseUnary(iteratee));
      }
      while (++index < length) {
        var fromIndex = 0,
            value = values[index],
            computed = iteratee ? iteratee(value) : value;

        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
          if (seen !== array) {
            splice.call(seen, fromIndex, 1);
          }
          splice.call(array, fromIndex, 1);
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.pullAt` without support for individual
     * indexes or capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */
    function basePullAt(array, indexes) {
      var length = array ? indexes.length : 0,
          lastIndex = length - 1;

      while (length--) {
        var index = indexes[length];
        if (length == lastIndex || index !== previous) {
          var previous = index;
          if (isIndex(index)) {
            splice.call(array, index, 1);
          } else {
            baseUnset(array, index);
          }
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.random` without support for returning
     * floating-point numbers.
     *
     * @private
     * @param {number} lower The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the random number.
     */
    function baseRandom(lower, upper) {
      return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
    }

    /**
     * The base implementation of `_.range` and `_.rangeRight` which doesn't
     * coerce arguments.
     *
     * @private
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @param {number} step The value to increment or decrement by.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the range of numbers.
     */
    function baseRange(start, end, step, fromRight) {
      var index = -1,
          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
          result = Array(length);

      while (length--) {
        result[fromRight ? length : ++index] = start;
        start += step;
      }
      return result;
    }

    /**
     * The base implementation of `_.repeat` which doesn't coerce arguments.
     *
     * @private
     * @param {string} string The string to repeat.
     * @param {number} n The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     */
    function baseRepeat(string, n) {
      var result = '';
      if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
        return result;
      }
      // Leverage the exponentiation by squaring algorithm for a faster repeat.
      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
      do {
        if (n % 2) {
          result += string;
        }
        n = nativeFloor(n / 2);
        if (n) {
          string += string;
        }
      } while (n);

      return result;
    }

    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + '');
    }

    /**
     * The base implementation of `_.sample`.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     */
    function baseSample(collection) {
      return arraySample(values(collection));
    }

    /**
     * The base implementation of `_.sampleSize` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */
    function baseSampleSize(collection, n) {
      var array = values(collection);
      return shuffleSelf(array, baseClamp(n, 0, array.length));
    }

    /**
     * The base implementation of `_.set`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseSet(object, path, value, customizer) {
      if (!isObject(object)) {
        return object;
      }
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          nested = object;

      while (nested != null && ++index < length) {
        var key = toKey(path[index]),
            newValue = value;

        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
          return object;
        }

        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : undefined;
          if (newValue === undefined) {
            newValue = isObject(objValue)
              ? objValue
              : (isIndex(path[index + 1]) ? [] : {});
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }

    /**
     * The base implementation of `setData` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var baseSetData = !metaMap ? identity : function(func, data) {
      metaMap.set(func, data);
      return func;
    };

    /**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var baseSetToString = !defineProperty ? identity : function(func, string) {
      return defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant(string),
        'writable': true
      });
    };

    /**
     * The base implementation of `_.shuffle`.
     *
     * @private
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */
    function baseShuffle(collection) {
      return shuffleSelf(values(collection));
    }

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * The base implementation of `_.some` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function baseSome(collection, predicate) {
      var result;

      baseEach(collection, function(value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
      });
      return !!result;
    }

    /**
     * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
     * performs a binary search of `array` to determine the index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function baseSortedIndex(array, value, retHighest) {
      var low = 0,
          high = array == null ? low : array.length;

      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
          var mid = (low + high) >>> 1,
              computed = array[mid];

          if (computed !== null && !isSymbol(computed) &&
              (retHighest ? (computed <= value) : (computed < value))) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return high;
      }
      return baseSortedIndexBy(array, value, identity, retHighest);
    }

    /**
     * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
     * which invokes `iteratee` for `value` and each element of `array` to compute
     * their sort ranking. The iteratee is invoked with one argument; (value).
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} iteratee The iteratee invoked per element.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function baseSortedIndexBy(array, value, iteratee, retHighest) {
      var low = 0,
          high = array == null ? 0 : array.length;
      if (high === 0) {
        return 0;
      }

      value = iteratee(value);
      var valIsNaN = value !== value,
          valIsNull = value === null,
          valIsSymbol = isSymbol(value),
          valIsUndefined = value === undefined;

      while (low < high) {
        var mid = nativeFloor((low + high) / 2),
            computed = iteratee(array[mid]),
            othIsDefined = computed !== undefined,
            othIsNull = computed === null,
            othIsReflexive = computed === computed,
            othIsSymbol = isSymbol(computed);

        if (valIsNaN) {
          var setLow = retHighest || othIsReflexive;
        } else if (valIsUndefined) {
          setLow = othIsReflexive && (retHighest || othIsDefined);
        } else if (valIsNull) {
          setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
        } else if (valIsSymbol) {
          setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
        } else if (othIsNull || othIsSymbol) {
          setLow = false;
        } else {
          setLow = retHighest ? (computed <= value) : (computed < value);
        }
        if (setLow) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return nativeMin(high, MAX_ARRAY_INDEX);
    }

    /**
     * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseSortedUniq(array, iteratee) {
      var index = -1,
          length = array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        if (!index || !eq(computed, seen)) {
          var seen = computed;
          result[resIndex++] = value === 0 ? 0 : value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.toNumber` which doesn't ensure correct
     * conversions of binary, hexadecimal, or octal string values.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     */
    function baseToNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      return +value;
    }

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return arrayMap(value, baseToString) + '';
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseUniq(array, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          length = array.length,
          isCommon = true,
          result = [],
          seen = result;

      if (comparator) {
        isCommon = false;
        includes = arrayIncludesWith;
      }
      else if (length >= LARGE_ARRAY_SIZE) {
        var set = iteratee ? null : createSet(array);
        if (set) {
          return setToArray(set);
        }
        isCommon = false;
        includes = cacheHas;
        seen = new SetCache;
      }
      else {
        seen = iteratee ? [] : result;
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        }
        else if (!includes(seen, computed, comparator)) {
          if (seen !== result) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.unset`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The property path to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     */
    function baseUnset(object, path) {
      path = castPath(path, object);
      object = parent(object, path);
      return object == null || delete object[toKey(last(path))];
    }

    /**
     * The base implementation of `_.update`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to update.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseUpdate(object, path, updater, customizer) {
      return baseSet(object, path, updater(baseGet(object, path)), customizer);
    }

    /**
     * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
     * without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseWhile(array, predicate, isDrop, fromRight) {
      var length = array.length,
          index = fromRight ? length : -1;

      while ((fromRight ? index-- : ++index < length) &&
        predicate(array[index], index, array)) {}

      return isDrop
        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
    }

    /**
     * The base implementation of `wrapperValue` which returns the result of
     * performing a sequence of actions on the unwrapped `value`, where each
     * successive action is supplied the return value of the previous.
     *
     * @private
     * @param {*} value The unwrapped value.
     * @param {Array} actions Actions to perform to resolve the unwrapped value.
     * @returns {*} Returns the resolved value.
     */
    function baseWrapperValue(value, actions) {
      var result = value;
      if (result instanceof LazyWrapper) {
        result = result.value();
      }
      return arrayReduce(actions, function(result, action) {
        return action.func.apply(action.thisArg, arrayPush([result], action.args));
      }, result);
    }

    /**
     * The base implementation of methods like `_.xor`, without support for
     * iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of values.
     */
    function baseXor(arrays, iteratee, comparator) {
      var length = arrays.length;
      if (length < 2) {
        return length ? baseUniq(arrays[0]) : [];
      }
      var index = -1,
          result = Array(length);

      while (++index < length) {
        var array = arrays[index],
            othIndex = -1;

        while (++othIndex < length) {
          if (othIndex != index) {
            result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
          }
        }
      }
      return baseUniq(baseFlatten(result, 1), iteratee, comparator);
    }

    /**
     * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
     *
     * @private
     * @param {Array} props The property identifiers.
     * @param {Array} values The property values.
     * @param {Function} assignFunc The function to assign values.
     * @returns {Object} Returns the new object.
     */
    function baseZipObject(props, values, assignFunc) {
      var index = -1,
          length = props.length,
          valsLength = values.length,
          result = {};

      while (++index < length) {
        var value = index < valsLength ? values[index] : undefined;
        assignFunc(result, props[index], value);
      }
      return result;
    }

    /**
     * Casts `value` to an empty array if it's not an array like object.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Array|Object} Returns the cast array-like object.
     */
    function castArrayLikeObject(value) {
      return isArrayLikeObject(value) ? value : [];
    }

    /**
     * Casts `value` to `identity` if it's not a function.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Function} Returns cast function.
     */
    function castFunction(value) {
      return typeof value == 'function' ? value : identity;
    }

    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {Object} [object] The object to query keys on.
     * @returns {Array} Returns the cast property path array.
     */
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }

    /**
     * A `baseRest` alias which can be replaced with `identity` by module
     * replacement plugins.
     *
     * @private
     * @type {Function}
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    var castRest = baseRest;

    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return (!start && end >= length) ? array : baseSlice(array, start, end);
    }

    /**
     * A simple wrapper around the global [`clearTimeout`](https://mdn.io/clearTimeout).
     *
     * @private
     * @param {number|Object} id The timer id or timeout object of the timer to clear.
     */
    var clearTimeout = ctxClearTimeout || function(id) {
      return root.clearTimeout(id);
    };

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

      buffer.copy(result);
      return result;
    }

    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }

    /**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }

    /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }

    /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }

    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    /**
     * Compares values to sort them in ascending order.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {number} Returns the sort order indicator for `value`.
     */
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== undefined,
            valIsNull = value === null,
            valIsReflexive = value === value,
            valIsSymbol = isSymbol(value);

        var othIsDefined = other !== undefined,
            othIsNull = other === null,
            othIsReflexive = other === other,
            othIsSymbol = isSymbol(other);

        if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
            (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
            (valIsNull && othIsDefined && othIsReflexive) ||
            (!valIsDefined && othIsReflexive) ||
            !valIsReflexive) {
          return 1;
        }
        if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
            (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
            (othIsNull && valIsDefined && valIsReflexive) ||
            (!othIsDefined && valIsReflexive) ||
            !othIsReflexive) {
          return -1;
        }
      }
      return 0;
    }

    /**
     * Used by `_.orderBy` to compare multiple properties of a value to another
     * and stable sort them.
     *
     * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
     * specify an order of "desc" for descending or "asc" for ascending sort order
     * of corresponding values.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {boolean[]|string[]} orders The order to sort by for each property.
     * @returns {number} Returns the sort order indicator for `object`.
     */
    function compareMultiple(object, other, orders) {
      var index = -1,
          objCriteria = object.criteria,
          othCriteria = other.criteria,
          length = objCriteria.length,
          ordersLength = orders.length;

      while (++index < length) {
        var result = compareAscending(objCriteria[index], othCriteria[index]);
        if (result) {
          if (index >= ordersLength) {
            return result;
          }
          var order = orders[index];
          return result * (order == 'desc' ? -1 : 1);
        }
      }
      // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
      // that causes it, under certain circumstances, to provide the same value for
      // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
      // for more details.
      //
      // This also ensures a stable sort in V8 and other engines.
      // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
      return object.index - other.index;
    }

    /**
     * Creates an array that is the composition of partially applied arguments,
     * placeholders, and provided arguments into a single array of arguments.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to prepend to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgs(args, partials, holders, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          holdersLength = holders.length,
          leftIndex = -1,
          leftLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(leftLength + rangeLength),
          isUncurried = !isCurried;

      while (++leftIndex < leftLength) {
        result[leftIndex] = partials[leftIndex];
      }
      while (++argsIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          result[holders[argsIndex]] = args[argsIndex];
        }
      }
      while (rangeLength--) {
        result[leftIndex++] = args[argsIndex++];
      }
      return result;
    }

    /**
     * This function is like `composeArgs` except that the arguments composition
     * is tailored for `_.partialRight`.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to append to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgsRight(args, partials, holders, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          holdersIndex = -1,
          holdersLength = holders.length,
          rightIndex = -1,
          rightLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(rangeLength + rightLength),
          isUncurried = !isCurried;

      while (++argsIndex < rangeLength) {
        result[argsIndex] = args[argsIndex];
      }
      var offset = argsIndex;
      while (++rightIndex < rightLength) {
        result[offset + rightIndex] = partials[rightIndex];
      }
      while (++holdersIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          result[offset + holders[holdersIndex]] = args[argsIndex++];
        }
      }
      return result;
    }

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : undefined;

        if (newValue === undefined) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }

    /**
     * Copies own symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }

    /**
     * Copies own and inherited symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbolsIn(source, object) {
      return copyObject(source, getSymbolsIn(source), object);
    }

    /**
     * Creates a function like `_.groupBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} [initializer] The accumulator object initializer.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter, initializer) {
      return function(collection, iteratee) {
        var func = isArray(collection) ? arrayAggregator : baseAggregator,
            accumulator = initializer ? initializer() : {};

        return func(collection, setter, getIteratee(iteratee, 2), accumulator);
      };
    }

    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined,
            guard = length > 2 ? sources[2] : undefined;

        customizer = (assigner.length > 3 && typeof customizer == 'function')
          ? (length--, customizer)
          : undefined;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }

    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }

    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    /**
     * Creates a function that wraps `func` to invoke it with the optional `this`
     * binding of `thisArg`.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createBind(func, bitmask, thisArg) {
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);

      function wrapper() {
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(isBind ? thisArg : this, arguments);
      }
      return wrapper;
    }

    /**
     * Creates a function like `_.lowerFirst`.
     *
     * @private
     * @param {string} methodName The name of the `String` case method to use.
     * @returns {Function} Returns the new case function.
     */
    function createCaseFirst(methodName) {
      return function(string) {
        string = toString(string);

        var strSymbols = hasUnicode(string)
          ? stringToArray(string)
          : undefined;

        var chr = strSymbols
          ? strSymbols[0]
          : string.charAt(0);

        var trailing = strSymbols
          ? castSlice(strSymbols, 1).join('')
          : string.slice(1);

        return chr[methodName]() + trailing;
      };
    }

    /**
     * Creates a function like `_.camelCase`.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
    function createCompounder(callback) {
      return function(string) {
        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
      };
    }

    /**
     * Creates a function that produces an instance of `Ctor` regardless of
     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
     *
     * @private
     * @param {Function} Ctor The constructor to wrap.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCtor(Ctor) {
      return function() {
        // Use a `switch` statement to work with class constructors. See
        // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
        // for more details.
        var args = arguments;
        switch (args.length) {
          case 0: return new Ctor;
          case 1: return new Ctor(args[0]);
          case 2: return new Ctor(args[0], args[1]);
          case 3: return new Ctor(args[0], args[1], args[2]);
          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
          case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
          case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        }
        var thisBinding = baseCreate(Ctor.prototype),
            result = Ctor.apply(thisBinding, args);

        // Mimic the constructor's `return` behavior.
        // See https://es5.github.io/#x13.2.2 for more details.
        return isObject(result) ? result : thisBinding;
      };
    }

    /**
     * Creates a function that wraps `func` to enable currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {number} arity The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCurry(func, bitmask, arity) {
      var Ctor = createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length,
            placeholder = getHolder(wrapper);

        while (index--) {
          args[index] = arguments[index];
        }
        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
          ? []
          : replaceHolders(args, placeholder);

        length -= holders.length;
        if (length < arity) {
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, undefined,
            args, holders, undefined, undefined, arity - length);
        }
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return apply(fn, this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} findIndexFunc The function to find the collection index.
     * @returns {Function} Returns the new find function.
     */
    function createFind(findIndexFunc) {
      return function(collection, predicate, fromIndex) {
        var iterable = Object(collection);
        if (!isArrayLike(collection)) {
          var iteratee = getIteratee(predicate, 3);
          collection = keys(collection);
          predicate = function(key) { return iteratee(iterable[key], key, iterable); };
        }
        var index = findIndexFunc(collection, predicate, fromIndex);
        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
      };
    }

    /**
     * Creates a `_.flow` or `_.flowRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new flow function.
     */
    function createFlow(fromRight) {
      return flatRest(function(funcs) {
        var length = funcs.length,
            index = length,
            prereq = LodashWrapper.prototype.thru;

        if (fromRight) {
          funcs.reverse();
        }
        while (index--) {
          var func = funcs[index];
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
            var wrapper = new LodashWrapper([], true);
          }
        }
        index = wrapper ? index : length;
        while (++index < length) {
          func = funcs[index];

          var funcName = getFuncName(func),
              data = funcName == 'wrapper' ? getData(func) : undefined;

          if (data && isLaziable(data[0]) &&
                data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
                !data[4].length && data[9] == 1
              ) {
            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
          } else {
            wrapper = (func.length == 1 && isLaziable(func))
              ? wrapper[funcName]()
              : wrapper.thru(func);
          }
        }
        return function() {
          var args = arguments,
              value = args[0];

          if (wrapper && args.length == 1 && isArray(value)) {
            return wrapper.plant(value).value();
          }
          var index = 0,
              result = length ? funcs[index].apply(this, args) : value;

          while (++index < length) {
            result = funcs[index].call(this, result);
          }
          return result;
        };
      });
    }

    /**
     * Creates a function that wraps `func` to invoke it with optional `this`
     * binding of `thisArg`, partial application, and currying.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [partialsRight] The arguments to append to those provided
     *  to the new function.
     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
      var isAry = bitmask & WRAP_ARY_FLAG,
          isBind = bitmask & WRAP_BIND_FLAG,
          isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
          isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
          isFlip = bitmask & WRAP_FLIP_FLAG,
          Ctor = isBindKey ? undefined : createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length;

        while (index--) {
          args[index] = arguments[index];
        }
        if (isCurried) {
          var placeholder = getHolder(wrapper),
              holdersCount = countHolders(args, placeholder);
        }
        if (partials) {
          args = composeArgs(args, partials, holders, isCurried);
        }
        if (partialsRight) {
          args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
        }
        length -= holdersCount;
        if (isCurried && length < arity) {
          var newHolders = replaceHolders(args, placeholder);
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, thisArg,
            args, newHolders, argPos, ary, arity - length
          );
        }
        var thisBinding = isBind ? thisArg : this,
            fn = isBindKey ? thisBinding[func] : func;

        length = args.length;
        if (argPos) {
          args = reorder(args, argPos);
        } else if (isFlip && length > 1) {
          args.reverse();
        }
        if (isAry && ary < length) {
          args.length = ary;
        }
        if (this && this !== root && this instanceof wrapper) {
          fn = Ctor || createCtor(fn);
        }
        return fn.apply(thisBinding, args);
      }
      return wrapper;
    }

    /**
     * Creates a function like `_.invertBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} toIteratee The function to resolve iteratees.
     * @returns {Function} Returns the new inverter function.
     */
    function createInverter(setter, toIteratee) {
      return function(object, iteratee) {
        return baseInverter(object, setter, toIteratee(iteratee), {});
      };
    }

    /**
     * Creates a function that performs a mathematical operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @param {number} [defaultValue] The value used for `undefined` arguments.
     * @returns {Function} Returns the new mathematical operation function.
     */
    function createMathOperation(operator, defaultValue) {
      return function(value, other) {
        var result;
        if (value === undefined && other === undefined) {
          return defaultValue;
        }
        if (value !== undefined) {
          result = value;
        }
        if (other !== undefined) {
          if (result === undefined) {
            return other;
          }
          if (typeof value == 'string' || typeof other == 'string') {
            value = baseToString(value);
            other = baseToString(other);
          } else {
            value = baseToNumber(value);
            other = baseToNumber(other);
          }
          result = operator(value, other);
        }
        return result;
      };
    }

    /**
     * Creates a function like `_.over`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over iteratees.
     * @returns {Function} Returns the new over function.
     */
    function createOver(arrayFunc) {
      return flatRest(function(iteratees) {
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        return baseRest(function(args) {
          var thisArg = this;
          return arrayFunc(iteratees, function(iteratee) {
            return apply(iteratee, thisArg, args);
          });
        });
      });
    }

    /**
     * Creates the padding for `string` based on `length`. The `chars` string
     * is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {number} length The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padding for `string`.
     */
    function createPadding(length, chars) {
      chars = chars === undefined ? ' ' : baseToString(chars);

      var charsLength = chars.length;
      if (charsLength < 2) {
        return charsLength ? baseRepeat(chars, length) : chars;
      }
      var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
      return hasUnicode(chars)
        ? castSlice(stringToArray(result), 0, length).join('')
        : result.slice(0, length);
    }

    /**
     * Creates a function that wraps `func` to invoke it with the `this` binding
     * of `thisArg` and `partials` prepended to the arguments it receives.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} partials The arguments to prepend to those provided to
     *  the new function.
     * @returns {Function} Returns the new wrapped function.
     */
    function createPartial(func, bitmask, thisArg, partials) {
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);

      function wrapper() {
        var argsIndex = -1,
            argsLength = arguments.length,
            leftIndex = -1,
            leftLength = partials.length,
            args = Array(leftLength + argsLength),
            fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

        while (++leftIndex < leftLength) {
          args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
          args[leftIndex++] = arguments[++argsIndex];
        }
        return apply(fn, isBind ? thisArg : this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.range` or `_.rangeRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new range function.
     */
    function createRange(fromRight) {
      return function(start, end, step) {
        if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
          end = step = undefined;
        }
        // Ensure the sign of `-0` is preserved.
        start = toFinite(start);
        if (end === undefined) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
        return baseRange(start, end, step, fromRight);
      };
    }

    /**
     * Creates a function that performs a relational operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @returns {Function} Returns the new relational operation function.
     */
    function createRelationalOperation(operator) {
      return function(value, other) {
        if (!(typeof value == 'string' && typeof other == 'string')) {
          value = toNumber(value);
          other = toNumber(other);
        }
        return operator(value, other);
      };
    }

    /**
     * Creates a function that wraps `func` to continue currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {Function} wrapFunc The function to create the `func` wrapper.
     * @param {*} placeholder The placeholder value.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
      var isCurry = bitmask & WRAP_CURRY_FLAG,
          newHolders = isCurry ? holders : undefined,
          newHoldersRight = isCurry ? undefined : holders,
          newPartials = isCurry ? partials : undefined,
          newPartialsRight = isCurry ? undefined : partials;

      bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
      bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

      if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
        bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
      }
      var newData = [
        func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
        newHoldersRight, argPos, ary, arity
      ];

      var result = wrapFunc.apply(undefined, newData);
      if (isLaziable(func)) {
        setData(result, newData);
      }
      result.placeholder = placeholder;
      return setWrapToString(result, func, bitmask);
    }

    /**
     * Creates a function like `_.round`.
     *
     * @private
     * @param {string} methodName The name of the `Math` method to use when rounding.
     * @returns {Function} Returns the new round function.
     */
    function createRound(methodName) {
      var func = Math[methodName];
      return function(number, precision) {
        number = toNumber(number);
        precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
        if (precision && nativeIsFinite(number)) {
          // Shift with exponential notation to avoid floating-point issues.
          // See [MDN](https://mdn.io/round#Examples) for more details.
          var pair = (toString(number) + 'e').split('e'),
              value = func(pair[0] + 'e' + (+pair[1] + precision));

          pair = (toString(value) + 'e').split('e');
          return +(pair[0] + 'e' + (+pair[1] - precision));
        }
        return func(number);
      };
    }

    /**
     * Creates a set object of `values`.
     *
     * @private
     * @param {Array} values The values to add to the set.
     * @returns {Object} Returns the new set.
     */
    var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
      return new Set(values);
    };

    /**
     * Creates a `_.toPairs` or `_.toPairsIn` function.
     *
     * @private
     * @param {Function} keysFunc The function to get the keys of a given object.
     * @returns {Function} Returns the new pairs function.
     */
    function createToPairs(keysFunc) {
      return function(object) {
        var tag = getTag(object);
        if (tag == mapTag) {
          return mapToArray(object);
        }
        if (tag == setTag) {
          return setToPairs(object);
        }
        return baseToPairs(object, keysFunc(object));
      };
    }

    /**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags.
     *    1 - `_.bind`
     *    2 - `_.bindKey`
     *    4 - `_.curry` or `_.curryRight` of a bound function
     *    8 - `_.curry`
     *   16 - `_.curryRight`
     *   32 - `_.partial`
     *   64 - `_.partialRight`
     *  128 - `_.rearg`
     *  256 - `_.ary`
     *  512 - `_.flip`
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
      var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
      if (!isBindKey && typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = partials ? partials.length : 0;
      if (!length) {
        bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
        partials = holders = undefined;
      }
      ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
      arity = arity === undefined ? arity : toInteger(arity);
      length -= holders ? holders.length : 0;

      if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
        var partialsRight = partials,
            holdersRight = holders;

        partials = holders = undefined;
      }
      var data = isBindKey ? undefined : getData(func);

      var newData = [
        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
        argPos, ary, arity
      ];

      if (data) {
        mergeData(newData, data);
      }
      func = newData[0];
      bitmask = newData[1];
      thisArg = newData[2];
      partials = newData[3];
      holders = newData[4];
      arity = newData[9] = newData[9] === undefined
        ? (isBindKey ? 0 : func.length)
        : nativeMax(newData[9] - length, 0);

      if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
        bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
      }
      if (!bitmask || bitmask == WRAP_BIND_FLAG) {
        var result = createBind(func, bitmask, thisArg);
      } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
        result = createCurry(func, bitmask, arity);
      } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
        result = createPartial(func, bitmask, thisArg, partials);
      } else {
        result = createHybrid.apply(undefined, newData);
      }
      var setter = data ? baseSetData : setData;
      return setWrapToString(setter(result, newData), func, bitmask);
    }

    /**
     * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
     * of source objects to the destination object for all destination properties
     * that resolve to `undefined`.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to assign.
     * @param {Object} object The parent object of `objValue`.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsAssignIn(objValue, srcValue, key, object) {
      if (objValue === undefined ||
          (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
        return srcValue;
      }
      return objValue;
    }

    /**
     * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
     * objects into destination objects that are passed thru.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to merge.
     * @param {Object} object The parent object of `objValue`.
     * @param {Object} source The parent object of `srcValue`.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
      if (isObject(objValue) && isObject(srcValue)) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, objValue);
        baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
        stack['delete'](srcValue);
      }
      return objValue;
    }

    /**
     * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
     * objects.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {string} key The key of the property to inspect.
     * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
     */
    function customOmitClone(value) {
      return isPlainObject(value) ? undefined : value;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      // Check that cyclic values are equal.
      var arrStacked = stack.get(array);
      var othStacked = stack.get(other);
      if (arrStacked && othStacked) {
        return arrStacked == other && othStacked == array;
      }
      var index = -1,
          result = true,
          seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

      stack.set(array, other);
      stack.set(other, array);

      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, arrValue, index, other, array, stack)
            : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
          if (!arraySome(other, function(othValue, othIndex) {
                if (!cacheHas(seen, othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
            result = false;
            break;
          }
        } else if (!(
              arrValue === othValue ||
                equalFunc(arrValue, othValue, bitmask, customizer, stack)
            )) {
          result = false;
          break;
        }
      }
      stack['delete'](array);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if ((object.byteLength != other.byteLength) ||
              (object.byteOffset != other.byteOffset)) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;

        case arrayBufferTag:
          if ((object.byteLength != other.byteLength) ||
              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;

        case boolTag:
        case dateTag:
        case numberTag:
          // Coerce booleans to `1` or `0` and dates to milliseconds.
          // Invalid dates are coerced to `NaN`.
          return eq(+object, +other);

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings, primitives and objects,
          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
          // for more details.
          return object == (other + '');

        case mapTag:
          var convert = mapToArray;

        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);

          if (object.size != other.size && !isPartial) {
            return false;
          }
          // Assume cyclic values are equal.
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;

          // Recursively compare objects (susceptible to call stack limits).
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack['delete'](object);
          return result;

        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          objProps = getAllKeys(object),
          objLength = objProps.length,
          othProps = getAllKeys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      // Check that cyclic values are equal.
      var objStacked = stack.get(object);
      var othStacked = stack.get(other);
      if (objStacked && othStacked) {
        return objStacked == other && othStacked == object;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);

      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, objValue, key, other, object, stack)
            : customizer(objValue, othValue, key, object, other, stack);
        }
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined
              ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
              : compared
            )) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack['delete'](object);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseRest` which flattens the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    function flatRest(func) {
      return setToString(overRest(func, undefined, flatten), func + '');
    }

    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }

    /**
     * Creates an array of own and inherited enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn);
    }

    /**
     * Gets metadata for `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {*} Returns the metadata for `func`.
     */
    var getData = !metaMap ? noop : function(func) {
      return metaMap.get(func);
    };

    /**
     * Gets the name of `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {string} Returns the function name.
     */
    function getFuncName(func) {
      var result = (func.name + ''),
          array = realNames[result],
          length = hasOwnProperty.call(realNames, result) ? array.length : 0;

      while (length--) {
        var data = array[length],
            otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
          return data.name;
        }
      }
      return result;
    }

    /**
     * Gets the argument placeholder value for `func`.
     *
     * @private
     * @param {Function} func The function to inspect.
     * @returns {*} Returns the placeholder value.
     */
    function getHolder(func) {
      var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
      return object.placeholder;
    }

    /**
     * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
     * this function returns the custom method, otherwise it returns `baseIteratee`.
     * If arguments are provided, the chosen function is invoked with them and
     * its result is returned.
     *
     * @private
     * @param {*} [value] The value to convert to an iteratee.
     * @param {number} [arity] The arity of the created iteratee.
     * @returns {Function} Returns the chosen function or its result.
     */
    function getIteratee() {
      var result = lodash.iteratee || iteratee;
      result = result === iteratee ? baseIteratee : result;
      return arguments.length ? result(arguments[0], arguments[1]) : result;
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = keys(object),
          length = result.length;

      while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }

    /**
     * Creates an array of the own enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };

    /**
     * Creates an array of the own and inherited enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
      }
      return result;
    };

    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = baseGetTag;

    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
        (Map && getTag(new Map) != mapTag) ||
        (Promise && getTag(Promise.resolve()) != promiseTag) ||
        (Set && getTag(new Set) != setTag) ||
        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
      getTag = function(value) {
        var result = baseGetTag(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : '';

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag;
            case mapCtorString: return mapTag;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag;
            case weakMapCtorString: return weakMapTag;
          }
        }
        return result;
      };
    }

    /**
     * Gets the view, applying any `transforms` to the `start` and `end` positions.
     *
     * @private
     * @param {number} start The start of the view.
     * @param {number} end The end of the view.
     * @param {Array} transforms The transformations to apply to the view.
     * @returns {Object} Returns an object containing the `start` and `end`
     *  positions of the view.
     */
    function getView(start, end, transforms) {
      var index = -1,
          length = transforms.length;

      while (++index < length) {
        var data = transforms[index],
            size = data.size;

        switch (data.type) {
          case 'drop':      start += size; break;
          case 'dropRight': end -= size; break;
          case 'take':      end = nativeMin(end, start + size); break;
          case 'takeRight': start = nativeMax(start, end - size); break;
        }
      }
      return { 'start': start, 'end': end };
    }

    /**
     * Extracts wrapper details from the `source` body comment.
     *
     * @private
     * @param {string} source The source to inspect.
     * @returns {Array} Returns the wrapper details.
     */
    function getWrapDetails(source) {
      var match = source.match(reWrapDetails);
      return match ? match[1].split(reSplitDetails) : [];
    }

    /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          result = false;

      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) &&
        (isArray(object) || isArguments(object));
    }

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = new array.constructor(length);

      // Add properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      return (typeof object.constructor == 'function' && !isPrototype(object))
        ? baseCreate(getPrototype(object))
        : {};
    }

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);

        case boolTag:
        case dateTag:
          return new Ctor(+object);

        case dataViewTag:
          return cloneDataView(object, isDeep);

        case float32Tag: case float64Tag:
        case int8Tag: case int16Tag: case int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
          return cloneTypedArray(object, isDeep);

        case mapTag:
          return new Ctor;

        case numberTag:
        case stringTag:
          return new Ctor(object);

        case regexpTag:
          return cloneRegExp(object);

        case setTag:
          return new Ctor;

        case symbolTag:
          return cloneSymbol(object);
      }
    }

    /**
     * Inserts wrapper `details` in a comment at the top of the `source` body.
     *
     * @private
     * @param {string} source The source to modify.
     * @returns {Array} details The details to insert.
     * @returns {string} Returns the modified source.
     */
    function insertWrapDetails(source, details) {
      var length = details.length;
      if (!length) {
        return source;
      }
      var lastIndex = length - 1;
      details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
      details = details.join(length > 2 ? ', ' : ' ');
      return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
    }

    /**
     * Checks if `value` is a flattenable `arguments` object or array.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
     */
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) ||
        !!(spreadableSymbol && value && value[spreadableSymbol]);
    }

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;

      return !!length &&
        (type == 'number' ||
          (type != 'symbol' && reIsUint.test(value))) &&
            (value > -1 && value % 1 == 0 && value < length);
    }

    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
            ? (isArrayLike(object) && isIndex(index, object.length))
            : (type == 'string' && index in object)
          ) {
        return eq(object[index], value);
      }
      return false;
    }

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Checks if `func` has a lazy counterpart.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
     *  else `false`.
     */
    function isLaziable(func) {
      var funcName = getFuncName(func),
          other = lodash[funcName];

      if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
        return false;
      }
      if (func === other) {
        return true;
      }
      var data = getData(other);
      return !!data && func === data[0];
    }

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /**
     * Checks if `func` is capable of being masked.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
     */
    var isMaskable = coreJsData ? isFunction : stubFalse;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

      return value === proto;
    }

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }

    /**
     * A specialized version of `matchesProperty` for source values suitable
     * for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue &&
          (srcValue !== undefined || (key in Object(object)));
      };
    }

    /**
     * A specialized version of `_.memoize` which clears the memoized function's
     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
     *
     * @private
     * @param {Function} func The function to have its output memoized.
     * @returns {Function} Returns the new memoized function.
     */
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });

      var cache = result.cache;
      return result;
    }

    /**
     * Merges the function metadata of `source` into `data`.
     *
     * Merging metadata reduces the number of wrappers used to invoke a function.
     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
     * may be applied regardless of execution order. Methods like `_.ary` and
     * `_.rearg` modify function arguments, making the order in which they are
     * executed important, preventing the merging of metadata. However, we make
     * an exception for a safe combined case where curried functions have `_.ary`
     * and or `_.rearg` applied.
     *
     * @private
     * @param {Array} data The destination metadata.
     * @param {Array} source The source metadata.
     * @returns {Array} Returns `data`.
     */
    function mergeData(data, source) {
      var bitmask = data[1],
          srcBitmask = source[1],
          newBitmask = bitmask | srcBitmask,
          isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

      var isCombo =
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
        ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

      // Exit early if metadata can't be merged.
      if (!(isCommon || isCombo)) {
        return data;
      }
      // Use source `thisArg` if available.
      if (srcBitmask & WRAP_BIND_FLAG) {
        data[2] = source[2];
        // Set when currying a bound function.
        newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
      }
      // Compose partial arguments.
      var value = source[3];
      if (value) {
        var partials = data[3];
        data[3] = partials ? composeArgs(partials, value, source[4]) : value;
        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
      }
      // Compose partial right arguments.
      value = source[5];
      if (value) {
        partials = data[5];
        data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
      }
      // Use source `argPos` if available.
      value = source[7];
      if (value) {
        data[7] = value;
      }
      // Use source `ary` if it's smaller.
      if (srcBitmask & WRAP_ARY_FLAG) {
        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
      }
      // Use source `arity` if one is not provided.
      if (data[9] == null) {
        data[9] = source[9];
      }
      // Use source `func` and merge bitmasks.
      data[0] = source[0];
      data[1] = newBitmask;

      return data;
    }

    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }

    /**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */
    function overRest(func, start, transform) {
      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }

    /**
     * Gets the parent value at `path` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path to get the parent value of.
     * @returns {*} Returns the parent value.
     */
    function parent(object, path) {
      return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
    }

    /**
     * Reorder `array` according to the specified indexes where the element at
     * the first index is assigned as the first element, the element at
     * the second index is assigned as the second element, and so on.
     *
     * @private
     * @param {Array} array The array to reorder.
     * @param {Array} indexes The arranged array indexes.
     * @returns {Array} Returns `array`.
     */
    function reorder(array, indexes) {
      var arrLength = array.length,
          length = nativeMin(indexes.length, arrLength),
          oldArray = copyArray(array);

      while (length--) {
        var index = indexes[length];
        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
      }
      return array;
    }

    /**
     * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function safeGet(object, key) {
      if (key === 'constructor' && typeof object[key] === 'function') {
        return;
      }

      if (key == '__proto__') {
        return;
      }

      return object[key];
    }

    /**
     * Sets metadata for `func`.
     *
     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
     * period of time, it will trip its breaker and transition to an identity
     * function to avoid garbage collection pauses in V8. See
     * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
     * for more details.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var setData = shortOut(baseSetData);

    /**
     * A simple wrapper around the global [`setTimeout`](https://mdn.io/setTimeout).
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @returns {number|Object} Returns the timer id or timeout object.
     */
    var setTimeout = ctxSetTimeout || function(func, wait) {
      return root.setTimeout(func, wait);
    };

    /**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var setToString = shortOut(baseSetToString);

    /**
     * Sets the `toString` method of `wrapper` to mimic the source of `reference`
     * with wrapper details in a comment at the top of the source body.
     *
     * @private
     * @param {Function} wrapper The function to modify.
     * @param {Function} reference The reference function.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Function} Returns `wrapper`.
     */
    function setWrapToString(wrapper, reference, bitmask) {
      var source = (reference + '');
      return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
    }

    /**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */
    function shortOut(func) {
      var count = 0,
          lastCalled = 0;

      return function() {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(undefined, arguments);
      };
    }

    /**
     * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @param {number} [size=array.length] The size of `array`.
     * @returns {Array} Returns `array`.
     */
    function shuffleSelf(array, size) {
      var index = -1,
          length = array.length,
          lastIndex = length - 1;

      size = size === undefined ? length : size;
      while (++index < size) {
        var rand = baseRandom(index, lastIndex),
            value = array[rand];

        array[rand] = array[index];
        array[index] = value;
      }
      array.length = size;
      return array;
    }

    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46 /* . */) {
        result.push('');
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    });

    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
      if (typeof value == 'string' || isSymbol(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Updates wrapper `details` based on `bitmask` flags.
     *
     * @private
     * @returns {Array} details The details to modify.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Array} Returns `details`.
     */
    function updateWrapDetails(details, bitmask) {
      arrayEach(wrapFlags, function(pair) {
        var value = '_.' + pair[0];
        if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
          details.push(value);
        }
      });
      return details.sort();
    }

    /**
     * Creates a clone of `wrapper`.
     *
     * @private
     * @param {Object} wrapper The wrapper to clone.
     * @returns {Object} Returns the cloned wrapper.
     */
    function wrapperClone(wrapper) {
      if (wrapper instanceof LazyWrapper) {
        return wrapper.clone();
      }
      var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
      result.__actions__ = copyArray(wrapper.__actions__);
      result.__index__  = wrapper.__index__;
      result.__values__ = wrapper.__values__;
      return result;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of elements split into groups the length of `size`.
     * If `array` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to process.
     * @param {number} [size=1] The length of each chunk
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the new array of chunks.
     * @example
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */
    function chunk(array, size, guard) {
      if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
        size = 1;
      } else {
        size = nativeMax(toInteger(size), 0);
      }
      var length = array == null ? 0 : array.length;
      if (!length || size < 1) {
        return [];
      }
      var index = 0,
          resIndex = 0,
          result = Array(nativeCeil(length / size));

      while (index < length) {
        result[resIndex++] = baseSlice(array, index, (index += size));
      }
      return result;
    }

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    /**
     * Creates a new array concatenating `array` with any additional arrays
     * and/or values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to concatenate.
     * @param {...*} [values] The values to concatenate.
     * @returns {Array} Returns the new concatenated array.
     * @example
     *
     * var array = [1];
     * var other = _.concat(array, 2, [3], [[4]]);
     *
     * console.log(other);
     * // => [1, 2, 3, [4]]
     *
     * console.log(array);
     * // => [1]
     */
    function concat() {
      var length = arguments.length;
      if (!length) {
        return [];
      }
      var args = Array(length - 1),
          array = arguments[0],
          index = length;

      while (index--) {
        args[index - 1] = arguments[index];
      }
      return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
    }

    /**
     * Creates an array of `array` values not included in the other given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * **Note:** Unlike `_.pullAll`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.without, _.xor
     * @example
     *
     * _.difference([2, 1], [2, 3]);
     * // => [1]
     */
    var difference = baseRest(function(array, values) {
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
        : [];
    });

    /**
     * This method is like `_.difference` except that it accepts `iteratee` which
     * is invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var differenceBy = baseRest(function(array, values) {
      var iteratee = last(values);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
        : [];
    });

    /**
     * This method is like `_.difference` except that it accepts `comparator`
     * which is invoked to compare elements of `array` to `values`. The order and
     * references of result values are determined by the first array. The comparator
     * is invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     *
     * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }]
     */
    var differenceWith = baseRest(function(array, values) {
      var comparator = last(values);
      if (isArrayLikeObject(comparator)) {
        comparator = undefined;
      }
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator)
        : [];
    });

    /**
     * Creates a slice of `array` with `n` elements dropped from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function drop(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      return baseSlice(array, n < 0 ? 0 : n, length);
    }

    /**
     * Creates a slice of `array` with `n` elements dropped from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function dropRight(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      n = length - n;
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the end.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.dropRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropRightWhile(users, ['active', false]);
     * // => objects for ['barney']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropRightWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */
    function dropRightWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true, true)
        : [];
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the beginning.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.dropWhile(users, function(o) { return !o.active; });
     * // => objects for ['pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropWhile(users, ['active', false]);
     * // => objects for ['pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */
    function dropWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true)
        : [];
    }

    /**
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     *
     * **Note:** This method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Array
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Array(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8, 10], '*', 1, 3);
     * // => [4, '*', '*', 10]
     */
    function fill(array, value, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
        start = 0;
        end = length;
      }
      return baseFill(array, value, start, end);
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(o) { return o.user == 'barney'; });
     * // => 0
     *
     * // The `_.matches` iteratee shorthand.
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findIndex(users, ['active', false]);
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.findIndex(users, 'active');
     * // => 2
     */
    function findIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseFindIndex(array, getIteratee(predicate, 3), index);
    }

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
     * // => 2
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
     * // => 0
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastIndex(users, ['active', false]);
     * // => 2
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastIndex(users, 'active');
     * // => 0
     */
    function findLastIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length - 1;
      if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        index = fromIndex < 0
          ? nativeMax(length + index, 0)
          : nativeMin(index, length - 1);
      }
      return baseFindIndex(array, getIteratee(predicate, 3), index, true);
    }

    /**
     * Flattens `array` a single level deep.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, [3, [4]], 5]]);
     * // => [1, 2, [3, [4]], 5]
     */
    function flatten(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, 1) : [];
    }

    /**
     * Recursively flattens `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, [3, [4]], 5]]);
     * // => [1, 2, 3, 4, 5]
     */
    function flattenDeep(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, INFINITY) : [];
    }

    /**
     * Recursively flatten `array` up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * var array = [1, [2, [3, [4]], 5]];
     *
     * _.flattenDepth(array, 1);
     * // => [1, 2, [3, [4]], 5]
     *
     * _.flattenDepth(array, 2);
     * // => [1, 2, 3, [4], 5]
     */
    function flattenDepth(array, depth) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      depth = depth === undefined ? 1 : toInteger(depth);
      return baseFlatten(array, depth);
    }

    /**
     * The inverse of `_.toPairs`; this method returns an object composed
     * from key-value `pairs`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} pairs The key-value pairs.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.fromPairs([['a', 1], ['b', 2]]);
     * // => { 'a': 1, 'b': 2 }
     */
    function fromPairs(pairs) {
      var index = -1,
          length = pairs == null ? 0 : pairs.length,
          result = {};

      while (++index < length) {
        var pair = pairs[index];
        result[pair[0]] = pair[1];
      }
      return result;
    }

    /**
     * Gets the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias first
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the first element of `array`.
     * @example
     *
     * _.head([1, 2, 3]);
     * // => 1
     *
     * _.head([]);
     * // => undefined
     */
    function head(array) {
      return (array && array.length) ? array[0] : undefined;
    }

    /**
     * Gets the index at which the first occurrence of `value` is found in `array`
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it's used as the
     * offset from the end of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // Search from the `fromIndex`.
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     */
    function indexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseIndexOf(array, value, index);
    }

    /**
     * Gets all but the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     */
    function initial(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseSlice(array, 0, -1) : [];
    }

    /**
     * Creates an array of unique values that are included in all given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersection([2, 1], [2, 3]);
     * // => [2]
     */
    var intersection = baseRest(function(arrays) {
      var mapped = arrayMap(arrays, castArrayLikeObject);
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped)
        : [];
    });

    /**
     * This method is like `_.intersection` except that it accepts `iteratee`
     * which is invoked for each element of each `arrays` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [2.1]
     *
     * // The `_.property` iteratee shorthand.
     * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }]
     */
    var intersectionBy = baseRest(function(arrays) {
      var iteratee = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);

      if (iteratee === last(mapped)) {
        iteratee = undefined;
      } else {
        mapped.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, getIteratee(iteratee, 2))
        : [];
    });

    /**
     * This method is like `_.intersection` except that it accepts `comparator`
     * which is invoked to compare elements of `arrays`. The order and references
     * of result values are determined by the first array. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.intersectionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }]
     */
    var intersectionWith = baseRest(function(arrays) {
      var comparator = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);

      comparator = typeof comparator == 'function' ? comparator : undefined;
      if (comparator) {
        mapped.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, undefined, comparator)
        : [];
    });

    /**
     * Converts all elements in `array` into a string separated by `separator`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to convert.
     * @param {string} [separator=','] The element separator.
     * @returns {string} Returns the joined string.
     * @example
     *
     * _.join(['a', 'b', 'c'], '~');
     * // => 'a~b~c'
     */
    function join(array, separator) {
      return array == null ? '' : nativeJoin.call(array, separator);
    }

    /**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
    function last(array) {
      var length = array == null ? 0 : array.length;
      return length ? array[length - 1] : undefined;
    }

    /**
     * This method is like `_.indexOf` except that it iterates over elements of
     * `array` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // Search from the `fromIndex`.
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     */
    function lastIndexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length;
      if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
      }
      return value === value
        ? strictLastIndexOf(array, value, index)
        : baseFindIndex(array, baseIsNaN, index, true);
    }

    /**
     * Gets the element at index `n` of `array`. If `n` is negative, the nth
     * element from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.11.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=0] The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     *
     * _.nth(array, 1);
     * // => 'b'
     *
     * _.nth(array, -2);
     * // => 'c';
     */
    function nth(array, n) {
      return (array && array.length) ? baseNth(array, toInteger(n)) : undefined;
    }

    /**
     * Removes all given values from `array` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
     * to remove elements from an array by predicate.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pull(array, 'a', 'c');
     * console.log(array);
     * // => ['b', 'b']
     */
    var pull = baseRest(pullAll);

    /**
     * This method is like `_.pull` except that it accepts an array of values to remove.
     *
     * **Note:** Unlike `_.difference`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pullAll(array, ['a', 'c']);
     * console.log(array);
     * // => ['b', 'b']
     */
    function pullAll(array, values) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values)
        : array;
    }

    /**
     * This method is like `_.pullAll` except that it accepts `iteratee` which is
     * invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The iteratee is invoked with one argument: (value).
     *
     * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
     *
     * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
     * console.log(array);
     * // => [{ 'x': 2 }]
     */
    function pullAllBy(array, values, iteratee) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values, getIteratee(iteratee, 2))
        : array;
    }

    /**
     * This method is like `_.pullAll` except that it accepts `comparator` which
     * is invoked to compare elements of `array` to `values`. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
     *
     * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
     * console.log(array);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
     */
    function pullAllWith(array, values, comparator) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values, undefined, comparator)
        : array;
    }

    /**
     * Removes elements from `array` corresponding to `indexes` and returns an
     * array of removed elements.
     *
     * **Note:** Unlike `_.at`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...(number|number[])} [indexes] The indexes of elements to remove.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     * var pulled = _.pullAt(array, [1, 3]);
     *
     * console.log(array);
     * // => ['a', 'c']
     *
     * console.log(pulled);
     * // => ['b', 'd']
     */
    var pullAt = flatRest(function(array, indexes) {
      var length = array == null ? 0 : array.length,
          result = baseAt(array, indexes);

      basePullAt(array, arrayMap(indexes, function(index) {
        return isIndex(index, length) ? +index : index;
      }).sort(compareAscending));

      return result;
    });

    /**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is invoked
     * with three arguments: (value, index, array).
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
     * to pull elements from an array by value.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */
    function remove(array, predicate) {
      var result = [];
      if (!(array && array.length)) {
        return result;
      }
      var index = -1,
          indexes = [],
          length = array.length;

      predicate = getIteratee(predicate, 3);
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result.push(value);
          indexes.push(index);
        }
      }
      basePullAt(array, indexes);
      return result;
    }

    /**
     * Reverses `array` so that the first element becomes the last, the second
     * element becomes the second to last, and so on.
     *
     * **Note:** This method mutates `array` and is based on
     * [`Array#reverse`](https://mdn.io/Array/reverse).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.reverse(array);
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function reverse(array) {
      return array == null ? array : nativeReverse.call(array);
    }

    /**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of
     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
     * returned.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function slice(array, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
        start = 0;
        end = length;
      }
      else {
        start = start == null ? 0 : toInteger(start);
        end = end === undefined ? length : toInteger(end);
      }
      return baseSlice(array, start, end);
    }

    /**
     * Uses a binary search to determine the lowest index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([30, 50], 40);
     * // => 1
     */
    function sortedIndex(array, value) {
      return baseSortedIndex(array, value);
    }

    /**
     * This method is like `_.sortedIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
     * // => 0
     */
    function sortedIndexBy(array, value, iteratee) {
      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
    }

    /**
     * This method is like `_.indexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
     * // => 1
     */
    function sortedIndexOf(array, value) {
      var length = array == null ? 0 : array.length;
      if (length) {
        var index = baseSortedIndex(array, value);
        if (index < length && eq(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.sortedIndex` except that it returns the highest
     * index at which `value` should be inserted into `array` in order to
     * maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
     * // => 4
     */
    function sortedLastIndex(array, value) {
      return baseSortedIndex(array, value, true);
    }

    /**
     * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 1
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
     * // => 1
     */
    function sortedLastIndexBy(array, value, iteratee) {
      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
    }

    /**
     * This method is like `_.lastIndexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
     * // => 3
     */
    function sortedLastIndexOf(array, value) {
      var length = array == null ? 0 : array.length;
      if (length) {
        var index = baseSortedIndex(array, value, true) - 1;
        if (eq(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.uniq` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniq([1, 1, 2]);
     * // => [1, 2]
     */
    function sortedUniq(array) {
      return (array && array.length)
        ? baseSortedUniq(array)
        : [];
    }

    /**
     * This method is like `_.uniqBy` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
     * // => [1.1, 2.3]
     */
    function sortedUniqBy(array, iteratee) {
      return (array && array.length)
        ? baseSortedUniq(array, getIteratee(iteratee, 2))
        : [];
    }

    /**
     * Gets all but the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.tail([1, 2, 3]);
     * // => [2, 3]
     */
    function tail(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseSlice(array, 1, length) : [];
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.take([1, 2, 3]);
     * // => [1]
     *
     * _.take([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.take([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */
    function take(array, n, guard) {
      if (!(array && array.length)) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRight([1, 2, 3]);
     * // => [3]
     *
     * _.takeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.takeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.takeRight([1, 2, 3], 0);
     * // => []
     */
    function takeRight(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      n = length - n;
      return baseSlice(array, n < 0 ? 0 : n, length);
    }

    /**
     * Creates a slice of `array` with elements taken from the end. Elements are
     * taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.takeRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeRightWhile(users, ['active', false]);
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeRightWhile(users, 'active');
     * // => []
     */
    function takeRightWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), false, true)
        : [];
    }

    /**
     * Creates a slice of `array` with elements taken from the beginning. Elements
     * are taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.takeWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeWhile(users, ['active', false]);
     * // => objects for ['barney', 'fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeWhile(users, 'active');
     * // => []
     */
    function takeWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3))
        : [];
    }

    /**
     * Creates an array of unique values, in order, from all given arrays using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.union([2], [1, 2]);
     * // => [2, 1]
     */
    var union = baseRest(function(arrays) {
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
    });

    /**
     * This method is like `_.union` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which uniqueness is computed. Result values are chosen from the first
     * array in which the value occurs. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.unionBy([2.1], [1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    var unionBy = baseRest(function(arrays) {
      var iteratee = last(arrays);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
    });

    /**
     * This method is like `_.union` except that it accepts `comparator` which
     * is invoked to compare elements of `arrays`. Result values are chosen from
     * the first array in which the value occurs. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.unionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var unionWith = baseRest(function(arrays) {
      var comparator = last(arrays);
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
    });

    /**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurrence of each element
     * is kept. The order of result values is determined by the order they occur
     * in the array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     */
    function uniq(array) {
      return (array && array.length) ? baseUniq(array) : [];
    }

    /**
     * This method is like `_.uniq` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * uniqueness is computed. The order of result values is determined by the
     * order they occur in the array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniqBy(array, iteratee) {
      return (array && array.length) ? baseUniq(array, getIteratee(iteratee, 2)) : [];
    }

    /**
     * This method is like `_.uniq` except that it accepts `comparator` which
     * is invoked to compare elements of `array`. The order of result values is
     * determined by the order they occur in the array.The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.uniqWith(objects, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
     */
    function uniqWith(array, comparator) {
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return (array && array.length) ? baseUniq(array, undefined, comparator) : [];
    }

    /**
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-zip
     * configuration.
     *
     * @static
     * @memberOf _
     * @since 1.2.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     *
     * _.unzip(zipped);
     * // => [['a', 'b'], [1, 2], [true, false]]
     */
    function unzip(array) {
      if (!(array && array.length)) {
        return [];
      }
      var length = 0;
      array = arrayFilter(array, function(group) {
        if (isArrayLikeObject(group)) {
          length = nativeMax(group.length, length);
          return true;
        }
      });
      return baseTimes(length, function(index) {
        return arrayMap(array, baseProperty(index));
      });
    }

    /**
     * This method is like `_.unzip` except that it accepts `iteratee` to specify
     * how regrouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  regrouped values.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zipped, _.add);
     * // => [3, 30, 300]
     */
    function unzipWith(array, iteratee) {
      if (!(array && array.length)) {
        return [];
      }
      var result = unzip(array);
      if (iteratee == null) {
        return result;
      }
      return arrayMap(result, function(group) {
        return apply(iteratee, undefined, group);
      });
    }

    /**
     * Creates an array excluding all given values using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.pull`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...*} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.xor
     * @example
     *
     * _.without([2, 1, 2, 3], 1, 2);
     * // => [3]
     */
    var without = baseRest(function(array, values) {
      return isArrayLikeObject(array)
        ? baseDifference(array, values)
        : [];
    });

    /**
     * Creates an array of unique values that is the
     * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
     * of the given arrays. The order of result values is determined by the order
     * they occur in the arrays.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.without
     * @example
     *
     * _.xor([2, 1], [2, 3]);
     * // => [1, 3]
     */
    var xor = baseRest(function(arrays) {
      return baseXor(arrayFilter(arrays, isArrayLikeObject));
    });

    /**
     * This method is like `_.xor` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which by which they're compared. The order of result values is determined
     * by the order they occur in the arrays. The iteratee is invoked with one
     * argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2, 3.4]
     *
     * // The `_.property` iteratee shorthand.
     * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var xorBy = baseRest(function(arrays) {
      var iteratee = last(arrays);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
    });

    /**
     * This method is like `_.xor` except that it accepts `comparator` which is
     * invoked to compare elements of `arrays`. The order of result values is
     * determined by the order they occur in the arrays. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.xorWith(objects, others, _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var xorWith = baseRest(function(arrays) {
      var comparator = last(arrays);
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
    });

    /**
     * Creates an array of grouped elements, the first of which contains the
     * first elements of the given arrays, the second of which contains the
     * second elements of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     */
    var zip = baseRest(unzip);

    /**
     * This method is like `_.fromPairs` except that it accepts two arrays,
     * one of property identifiers and one of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 0.4.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObject(['a', 'b'], [1, 2]);
     * // => { 'a': 1, 'b': 2 }
     */
    function zipObject(props, values) {
      return baseZipObject(props || [], values || [], assignValue);
    }

    /**
     * This method is like `_.zipObject` except that it supports property paths.
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
     * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
     */
    function zipObjectDeep(props, values) {
      return baseZipObject(props || [], values || [], baseSet);
    }

    /**
     * This method is like `_.zip` except that it accepts `iteratee` to specify
     * how grouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  grouped values.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
     *   return a + b + c;
     * });
     * // => [111, 222]
     */
    var zipWith = baseRest(function(arrays) {
      var length = arrays.length,
          iteratee = length > 1 ? arrays[length - 1] : undefined;

      iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
      return unzipWith(arrays, iteratee);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` wrapper instance that wraps `value` with explicit method
     * chain sequences enabled. The result of such sequences must be unwrapped
     * with `_#value`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Seq
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36 },
     *   { 'user': 'fred',    'age': 40 },
     *   { 'user': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _
     *   .chain(users)
     *   .sortBy('age')
     *   .map(function(o) {
     *     return o.user + ' is ' + o.age;
     *   })
     *   .head()
     *   .value();
     * // => 'pebbles is 1'
     */
    function chain(value) {
      var result = lodash(value);
      result.__chain__ = true;
      return result;
    }

    /**
     * This method invokes `interceptor` and returns `value`. The interceptor
     * is invoked with one argument; (value). The purpose of this method is to
     * "tap into" a method chain sequence in order to modify intermediate results.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3])
     *  .tap(function(array) {
     *    // Mutate input array.
     *    array.pop();
     *  })
     *  .reverse()
     *  .value();
     * // => [2, 1]
     */
    function tap(value, interceptor) {
      interceptor(value);
      return value;
    }

    /**
     * This method is like `_.tap` except that it returns the result of `interceptor`.
     * The purpose of this method is to "pass thru" values replacing intermediate
     * results in a method chain sequence.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns the result of `interceptor`.
     * @example
     *
     * _('  abc  ')
     *  .chain()
     *  .trim()
     *  .thru(function(value) {
     *    return [value];
     *  })
     *  .value();
     * // => ['abc']
     */
    function thru(value, interceptor) {
      return interceptor(value);
    }

    /**
     * This method is the wrapper version of `_.at`.
     *
     * @name at
     * @memberOf _
     * @since 1.0.0
     * @category Seq
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _(object).at(['a[0].b.c', 'a[1]']).value();
     * // => [3, 4]
     */
    var wrapperAt = flatRest(function(paths) {
      var length = paths.length,
          start = length ? paths[0] : 0,
          value = this.__wrapped__,
          interceptor = function(object) { return baseAt(object, paths); };

      if (length > 1 || this.__actions__.length ||
          !(value instanceof LazyWrapper) || !isIndex(start)) {
        return this.thru(interceptor);
      }
      value = value.slice(start, +start + (length ? 1 : 0));
      value.__actions__.push({
        'func': thru,
        'args': [interceptor],
        'thisArg': undefined
      });
      return new LodashWrapper(value, this.__chain__).thru(function(array) {
        if (length && !array.length) {
          array.push(undefined);
        }
        return array;
      });
    });

    /**
     * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
     *
     * @name chain
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // A sequence without explicit chaining.
     * _(users).head();
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // A sequence with explicit chaining.
     * _(users)
     *   .chain()
     *   .head()
     *   .pick('user')
     *   .value();
     * // => { 'user': 'barney' }
     */
    function wrapperChain() {
      return chain(this);
    }

    /**
     * Executes the chain sequence and returns the wrapped result.
     *
     * @name commit
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).push(3);
     *
     * console.log(array);
     * // => [1, 2]
     *
     * wrapped = wrapped.commit();
     * console.log(array);
     * // => [1, 2, 3]
     *
     * wrapped.last();
     * // => 3
     *
     * console.log(array);
     * // => [1, 2, 3]
     */
    function wrapperCommit() {
      return new LodashWrapper(this.value(), this.__chain__);
    }

    /**
     * Gets the next value on a wrapped object following the
     * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
     *
     * @name next
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the next iterator value.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 1 }
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 2 }
     *
     * wrapped.next();
     * // => { 'done': true, 'value': undefined }
     */
    function wrapperNext() {
      if (this.__values__ === undefined) {
        this.__values__ = toArray(this.value());
      }
      var done = this.__index__ >= this.__values__.length,
          value = done ? undefined : this.__values__[this.__index__++];

      return { 'done': done, 'value': value };
    }

    /**
     * Enables the wrapper to be iterable.
     *
     * @name Symbol.iterator
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the wrapper object.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped[Symbol.iterator]() === wrapped;
     * // => true
     *
     * Array.from(wrapped);
     * // => [1, 2]
     */
    function wrapperToIterator() {
      return this;
    }

    /**
     * Creates a clone of the chain sequence planting `value` as the wrapped value.
     *
     * @name plant
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @param {*} value The value to plant.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2]).map(square);
     * var other = wrapped.plant([3, 4]);
     *
     * other.value();
     * // => [9, 16]
     *
     * wrapped.value();
     * // => [1, 4]
     */
    function wrapperPlant(value) {
      var result,
          parent = this;

      while (parent instanceof baseLodash) {
        var clone = wrapperClone(parent);
        clone.__index__ = 0;
        clone.__values__ = undefined;
        if (result) {
          previous.__wrapped__ = clone;
        } else {
          result = clone;
        }
        var previous = clone;
        parent = parent.__wrapped__;
      }
      previous.__wrapped__ = value;
      return result;
    }

    /**
     * This method is the wrapper version of `_.reverse`.
     *
     * **Note:** This method mutates the wrapped array.
     *
     * @name reverse
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _(array).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function wrapperReverse() {
      var value = this.__wrapped__;
      if (value instanceof LazyWrapper) {
        var wrapped = value;
        if (this.__actions__.length) {
          wrapped = new LazyWrapper(this);
        }
        wrapped = wrapped.reverse();
        wrapped.__actions__.push({
          'func': thru,
          'args': [reverse],
          'thisArg': undefined
        });
        return new LodashWrapper(wrapped, this.__chain__);
      }
      return this.thru(reverse);
    }

    /**
     * Executes the chain sequence to resolve the unwrapped value.
     *
     * @name value
     * @memberOf _
     * @since 0.1.0
     * @alias toJSON, valueOf
     * @category Seq
     * @returns {*} Returns the resolved unwrapped value.
     * @example
     *
     * _([1, 2, 3]).value();
     * // => [1, 2, 3]
     */
    function wrapperValue() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the number of times the key was returned by `iteratee`. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': 1, '6': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        ++result[key];
      } else {
        baseAssignValue(result, key, 1);
      }
    });

    /**
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * Iteration is stopped once `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * **Note:** This method returns `true` for
     * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
     * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
     * elements of empty collections.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.every(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.every(users, 'active');
     * // => false
     */
    function every(collection, predicate, guard) {
      var func = isArray(collection) ? arrayEvery : baseEvery;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined;
      }
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * **Note:** Unlike `_.remove`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.reject
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, { 'age': 36, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.filter(users, 'active');
     * // => objects for ['barney']
     *
     * // Combining several predicates using `_.overEvery` or `_.overSome`.
     * _.filter(users, _.overSome([{ 'age': 36 }, ['age', 40]]));
     * // => objects for ['fred', 'barney']
     */
    function filter(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.find(users, function(o) { return o.age < 40; });
     * // => object for 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.find(users, { 'age': 1, 'active': true });
     * // => object for 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.find(users, ['active', false]);
     * // => object for 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.find(users, 'active');
     * // => object for 'barney'
     */
    var find = createFind(findIndex);

    /**
     * This method is like `_.find` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=collection.length-1] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(n) {
     *   return n % 2 == 1;
     * });
     * // => 3
     */
    var findLast = createFind(findLastIndex);

    /**
     * Creates a flattened array of values by running each element in `collection`
     * thru `iteratee` and flattening the mapped results. The iteratee is invoked
     * with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [n, n];
     * }
     *
     * _.flatMap([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */
    function flatMap(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), 1);
    }

    /**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDeep([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */
    function flatMapDeep(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), INFINITY);
    }

    /**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDepth([1, 2], duplicate, 2);
     * // => [[1, 1], [2, 2]]
     */
    function flatMapDepth(collection, iteratee, depth) {
      depth = depth === undefined ? 1 : toInteger(depth);
      return baseFlatten(map(collection, iteratee), depth);
    }

    /**
     * Iterates over elements of `collection` and invokes `iteratee` for each element.
     * The iteratee is invoked with three arguments: (value, index|key, collection).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length"
     * property are iterated like arrays. To avoid this behavior use `_.forIn`
     * or `_.forOwn` for object iteration.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias each
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEachRight
     * @example
     *
     * _.forEach([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `1` then `2`.
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forEach(collection, iteratee) {
      var func = isArray(collection) ? arrayEach : baseEach;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.forEach` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @alias eachRight
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEach
     * @example
     *
     * _.forEachRight([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `2` then `1`.
     */
    function forEachRight(collection, iteratee) {
      var func = isArray(collection) ? arrayEachRight : baseEachRight;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The order of grouped values
     * is determined by the order they occur in `collection`. The corresponding
     * value of each key is an array of elements responsible for generating the
     * key. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': [4.2], '6': [6.1, 6.3] }
     *
     * // The `_.property` iteratee shorthand.
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        baseAssignValue(result, key, [value]);
      }
    });

    /**
     * Checks if `value` is in `collection`. If `collection` is a string, it's
     * checked for a substring of `value`, otherwise
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * is used for equality comparisons. If `fromIndex` is negative, it's used as
     * the offset from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {boolean} Returns `true` if `value` is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'a': 1, 'b': 2 }, 1);
     * // => true
     *
     * _.includes('abcd', 'bc');
     * // => true
     */
    function includes(collection, value, fromIndex, guard) {
      collection = isArrayLike(collection) ? collection : values(collection);
      fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

      var length = collection.length;
      if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
      }
      return isString(collection)
        ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
        : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
    }

    /**
     * Invokes the method at `path` of each element in `collection`, returning
     * an array of the results of each invoked method. Any additional arguments
     * are provided to each invoked method. If `path` is a function, it's invoked
     * for, and `this` bound to, each element in `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array|Function|string} path The path of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [args] The arguments to invoke each method with.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invokeMap([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    var invokeMap = baseRest(function(collection, path, args) {
      var index = -1,
          isFunc = typeof path == 'function',
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value) {
        result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
      });
      return result;
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the last element responsible for generating the key. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var array = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.keyBy(array, function(o) {
     *   return String.fromCharCode(o.code);
     * });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.keyBy(array, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     */
    var keyBy = createAggregator(function(result, value, key) {
      baseAssignValue(result, key, value);
    });

    /**
     * Creates an array of values by running each element in `collection` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
     * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * _.map([4, 8], square);
     * // => [16, 64]
     *
     * _.map({ 'a': 4, 'b': 8 }, square);
     * // => [16, 64] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */
    function map(collection, iteratee) {
      var func = isArray(collection) ? arrayMap : baseMap;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.sortBy` except that it allows specifying the sort
     * orders of the iteratees to sort by. If `orders` is unspecified, all values
     * are sorted in ascending order. Otherwise, specify an order of "desc" for
     * descending or "asc" for ascending sort order of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @param {string[]} [orders] The sort orders of `iteratees`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 40 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // Sort by `user` in ascending order and by `age` in descending order.
     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
     */
    function orderBy(collection, iteratees, orders, guard) {
      if (collection == null) {
        return [];
      }
      if (!isArray(iteratees)) {
        iteratees = iteratees == null ? [] : [iteratees];
      }
      orders = guard ? undefined : orders;
      if (!isArray(orders)) {
        orders = orders == null ? [] : [orders];
      }
      return baseOrderBy(collection, iteratees, orders);
    }

    /**
     * Creates an array of elements split into two groups, the first of which
     * contains elements `predicate` returns truthy for, the second of which
     * contains elements `predicate` returns falsey for. The predicate is
     * invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of grouped elements.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': false },
     *   { 'user': 'fred',    'age': 40, 'active': true },
     *   { 'user': 'pebbles', 'age': 1,  'active': false }
     * ];
     *
     * _.partition(users, function(o) { return o.active; });
     * // => objects for [['fred'], ['barney', 'pebbles']]
     *
     * // The `_.matches` iteratee shorthand.
     * _.partition(users, { 'age': 1, 'active': false });
     * // => objects for [['pebbles'], ['barney', 'fred']]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.partition(users, ['active', false]);
     * // => objects for [['barney', 'pebbles'], ['fred']]
     *
     * // The `_.property` iteratee shorthand.
     * _.partition(users, 'active');
     * // => objects for [['fred'], ['barney', 'pebbles']]
     */
    var partition = createAggregator(function(result, value, key) {
      result[key ? 0 : 1].push(value);
    }, function() { return [[], []]; });

    /**
     * Reduces `collection` to a value which is the accumulated result of running
     * each element in `collection` thru `iteratee`, where each successive
     * invocation is supplied the return value of the previous. If `accumulator`
     * is not given, the first element of `collection` is used as the initial
     * value. The iteratee is invoked with four arguments:
     * (accumulator, value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.reduce`, `_.reduceRight`, and `_.transform`.
     *
     * The guarded methods are:
     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
     * and `sortBy`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduceRight
     * @example
     *
     * _.reduce([1, 2], function(sum, n) {
     *   return sum + n;
     * }, 0);
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     *   return result;
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
     */
    function reduce(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduce : baseReduce,
          initAccum = arguments.length < 3;

      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
    }

    /**
     * This method is like `_.reduce` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduce
     * @example
     *
     * var array = [[0, 1], [2, 3], [4, 5]];
     *
     * _.reduceRight(array, function(flattened, other) {
     *   return flattened.concat(other);
     * }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    function reduceRight(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduceRight : baseReduce,
          initAccum = arguments.length < 3;

      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
    }

    /**
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.filter
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * _.reject(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.reject(users, { 'age': 40, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.reject(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.reject(users, 'active');
     * // => objects for ['barney']
     */
    function reject(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, negate(getIteratee(predicate, 3)));
    }

    /**
     * Gets a random element from `collection`.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     */
    function sample(collection) {
      var func = isArray(collection) ? arraySample : baseSample;
      return func(collection);
    }

    /**
     * Gets `n` random elements at unique keys from `collection` up to the
     * size of `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @param {number} [n=1] The number of elements to sample.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the random elements.
     * @example
     *
     * _.sampleSize([1, 2, 3], 2);
     * // => [3, 1]
     *
     * _.sampleSize([1, 2, 3], 4);
     * // => [2, 3, 1]
     */
    function sampleSize(collection, n, guard) {
      if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      var func = isArray(collection) ? arraySampleSize : baseSampleSize;
      return func(collection, n);
    }

    /**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */
    function shuffle(collection) {
      var func = isArray(collection) ? arrayShuffle : baseShuffle;
      return func(collection);
    }

    /**
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable string keyed properties for objects.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns the collection size.
     * @example
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */
    function size(collection) {
      if (collection == null) {
        return 0;
      }
      if (isArrayLike(collection)) {
        return isString(collection) ? stringSize(collection) : collection.length;
      }
      var tag = getTag(collection);
      if (tag == mapTag || tag == setTag) {
        return collection.size;
      }
      return baseKeys(collection).length;
    }

    /**
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * Iteration is stopped once `predicate` returns truthy. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.some(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.some(users, 'active');
     * // => true
     */
    function some(collection, predicate, guard) {
      var func = isArray(collection) ? arraySome : baseSome;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined;
      }
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection thru each iteratee. This method
     * performs a stable sort, that is, it preserves the original sort order of
     * equal elements. The iteratees are invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 30 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.sortBy(users, [function(o) { return o.user; }]);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 30]]
     *
     * _.sortBy(users, ['user', 'age']);
     * // => objects for [['barney', 34], ['barney', 36], ['fred', 30], ['fred', 48]]
     */
    var sortBy = baseRest(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var length = iteratees.length;
      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [iteratees[0]];
      }
      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => Logs the number of milliseconds it took for the deferred invocation.
     */
    var now = ctxNow || function() {
      return root.Date.now();
    };

    /*------------------------------------------------------------------------*/

    /**
     * The opposite of `_.before`; this method creates a function that invokes
     * `func` once it's called `n` or more times.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {number} n The number of calls before `func` is invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => Logs 'done saving!' after the two async saves have completed.
     */
    function after(n, func) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that invokes `func`, with up to `n` arguments,
     * ignoring any additional arguments.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @param {number} [n=func.length] The arity cap.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */
    function ary(func, n, guard) {
      n = guard ? undefined : n;
      n = (func && n == null) ? func.length : n;
      return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
    }

    /**
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it's called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * jQuery(element).on('click', _.before(5, addContactToList));
     * // => Allows adding up to 4 contacts to the list.
     */
    function before(n, func) {
      var result;
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = undefined;
        }
        return result;
      };
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and `partials` prepended to the arguments it receives.
     *
     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for partially applied arguments.
     *
     * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
     * property of bound functions.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * function greet(greeting, punctuation) {
     *   return greeting + ' ' + this.user + punctuation;
     * }
     *
     * var object = { 'user': 'fred' };
     *
     * var bound = _.bind(greet, object, 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bind(greet, object, _, '!');
     * bound('hi');
     * // => 'hi fred!'
     */
    var bind = baseRest(function(func, thisArg, partials) {
      var bitmask = WRAP_BIND_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bind));
        bitmask |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(func, bitmask, thisArg, partials, holders);
    });

    /**
     * Creates a function that invokes the method at `object[key]` with `partials`
     * prepended to the arguments it receives.
     *
     * This method differs from `_.bind` by allowing bound functions to reference
     * methods that may be redefined or don't yet exist. See
     * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
     * for more details.
     *
     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Function
     * @param {Object} object The object to invoke the method on.
     * @param {string} key The key of the method.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'user': 'fred',
     *   'greet': function(greeting, punctuation) {
     *     return greeting + ' ' + this.user + punctuation;
     *   }
     * };
     *
     * var bound = _.bindKey(object, 'greet', 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * object.greet = function(greeting, punctuation) {
     *   return greeting + 'ya ' + this.user + punctuation;
     * };
     *
     * bound('!');
     * // => 'hiya fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bindKey(object, 'greet', _, '!');
     * bound('hi');
     * // => 'hiya fred!'
     */
    var bindKey = baseRest(function(object, key, partials) {
      var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bindKey));
        bitmask |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(key, bitmask, object, partials, holders);
    });

    /**
     * Creates a function that accepts arguments of `func` and either invokes
     * `func` returning its result, if at least `arity` number of arguments have
     * been provided, or returns a function that accepts the remaining `func`
     * arguments, and so on. The arity of `func` may be specified if `func.length`
     * is not sufficient.
     *
     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curry(abc);
     *
     * curried(1)(2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(1)(_, 3)(2);
     * // => [1, 2, 3]
     */
    function curry(func, arity, guard) {
      arity = guard ? undefined : arity;
      var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
      result.placeholder = curry.placeholder;
      return result;
    }

    /**
     * This method is like `_.curry` except that arguments are applied to `func`
     * in the manner of `_.partialRight` instead of `_.partial`.
     *
     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curryRight(abc);
     *
     * curried(3)(2)(1);
     * // => [1, 2, 3]
     *
     * curried(2, 3)(1);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(3)(1, _)(2);
     * // => [1, 2, 3]
     */
    function curryRight(func, arity, guard) {
      arity = guard ? undefined : arity;
      var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
      result.placeholder = curryRight.placeholder;
      return result;
    }

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide `options` to indicate whether `func` should be invoked on the
     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent
     * calls to the debounced function return the result of the last `func`
     * invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false]
     *  Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait]
     *  The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // Avoid costly calculations while the window size is in flux.
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // Cancel the trailing debounced invocation.
     * jQuery(window).on('popstate', debounced.cancel);
     */
    function debounce(func, wait, options) {
      var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }

      function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
      }

      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            timeWaiting = wait - timeSinceLastCall;

        return maxing
          ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
          : timeWaiting;
      }

      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
      }

      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
      }

      function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
      }

      function cancel() {
        if (timerId !== undefined) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
      }

      function flush() {
        return timerId === undefined ? result : trailingEdge(now());
      }

      function debounced() {
        var time = now(),
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
          if (timerId === undefined) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            // Handle invocations in a tight loop.
            clearTimeout(timerId);
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === undefined) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }

    /**
     * Defers invoking the `func` until the current call stack has cleared. Any
     * additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to defer.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) {
     *   console.log(text);
     * }, 'deferred');
     * // => Logs 'deferred' after one millisecond.
     */
    var defer = baseRest(function(func, args) {
      return baseDelay(func, 1, args);
    });

    /**
     * Invokes `func` after `wait` milliseconds. Any additional arguments are
     * provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) {
     *   console.log(text);
     * }, 1000, 'later');
     * // => Logs 'later' after one second.
     */
    var delay = baseRest(function(func, wait, args) {
      return baseDelay(func, toNumber(wait) || 0, args);
    });

    /**
     * Creates a function that invokes `func` with arguments reversed.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to flip arguments for.
     * @returns {Function} Returns the new flipped function.
     * @example
     *
     * var flipped = _.flip(function() {
     *   return _.toArray(arguments);
     * });
     *
     * flipped('a', 'b', 'c', 'd');
     * // => ['d', 'c', 'b', 'a']
     */
    function flip(func) {
      return createWrap(func, WRAP_FLIP_FLAG);
    }

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache);
      return memoized;
    }

    // Expose `MapCache`.
    memoize.Cache = MapCache;

    /**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new negated function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */
    function negate(predicate) {
      if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function() {
        var args = arguments;
        switch (args.length) {
          case 0: return !predicate.call(this);
          case 1: return !predicate.call(this, args[0]);
          case 2: return !predicate.call(this, args[0], args[1]);
          case 3: return !predicate.call(this, args[0], args[1], args[2]);
        }
        return !predicate.apply(this, args);
      };
    }

    /**
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first invocation. The `func` is
     * invoked with the `this` binding and arguments of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // => `createApplication` is invoked once
     */
    function once(func) {
      return before(2, func);
    }

    /**
     * Creates a function that invokes `func` with its arguments transformed.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Function
     * @param {Function} func The function to wrap.
     * @param {...(Function|Function[])} [transforms=[_.identity]]
     *  The argument transforms.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function doubled(n) {
     *   return n * 2;
     * }
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var func = _.overArgs(function(x, y) {
     *   return [x, y];
     * }, [square, doubled]);
     *
     * func(9, 3);
     * // => [81, 6]
     *
     * func(10, 5);
     * // => [100, 10]
     */
    var overArgs = castRest(function(func, transforms) {
      transforms = (transforms.length == 1 && isArray(transforms[0]))
        ? arrayMap(transforms[0], baseUnary(getIteratee()))
        : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));

      var funcsLength = transforms.length;
      return baseRest(function(args) {
        var index = -1,
            length = nativeMin(args.length, funcsLength);

        while (++index < length) {
          args[index] = transforms[index].call(this, args[index]);
        }
        return apply(func, this, args);
      });
    });

    /**
     * Creates a function that invokes `func` with `partials` prepended to the
     * arguments it receives. This method is like `_.bind` except it does **not**
     * alter the `this` binding.
     *
     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 0.2.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var sayHelloTo = _.partial(greet, 'hello');
     * sayHelloTo('fred');
     * // => 'hello fred'
     *
     * // Partially applied with placeholders.
     * var greetFred = _.partial(greet, _, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     */
    var partial = baseRest(function(func, partials) {
      var holders = replaceHolders(partials, getHolder(partial));
      return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
    });

    /**
     * This method is like `_.partial` except that partially applied arguments
     * are appended to the arguments it receives.
     *
     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var greetFred = _.partialRight(greet, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     *
     * // Partially applied with placeholders.
     * var sayHelloTo = _.partialRight(greet, 'hello', _);
     * sayHelloTo('fred');
     * // => 'hello fred'
     */
    var partialRight = baseRest(function(func, partials) {
      var holders = replaceHolders(partials, getHolder(partialRight));
      return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
    });

    /**
     * Creates a function that invokes `func` with arguments arranged according
     * to the specified `indexes` where the argument value at the first index is
     * provided as the first argument, the argument value at the second index is
     * provided as the second argument, and so on.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to rearrange arguments for.
     * @param {...(number|number[])} indexes The arranged argument indexes.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var rearged = _.rearg(function(a, b, c) {
     *   return [a, b, c];
     * }, [2, 0, 1]);
     *
     * rearged('b', 'c', 'a')
     * // => ['a', 'b', 'c']
     */
    var rearg = flatRest(function(func, indexes) {
      return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
    });

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as
     * an array.
     *
     * **Note:** This method is based on the
     * [rest parameter](https://mdn.io/rest_parameters).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.rest(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
    function rest(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = start === undefined ? start : toInteger(start);
      return baseRest(func, start);
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * create function and an array of arguments much like
     * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
     *
     * **Note:** This method is based on the
     * [spread operator](https://mdn.io/spread_operator).
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Function
     * @param {Function} func The function to spread arguments over.
     * @param {number} [start=0] The start position of the spread.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.spread(function(who, what) {
     *   return who + ' says ' + what;
     * });
     *
     * say(['fred', 'hello']);
     * // => 'fred says hello'
     *
     * var numbers = Promise.all([
     *   Promise.resolve(40),
     *   Promise.resolve(36)
     * ]);
     *
     * numbers.then(_.spread(function(x, y) {
     *   return x + y;
     * }));
     * // => a Promise of 76
     */
    function spread(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = start == null ? 0 : nativeMax(toInteger(start), 0);
      return baseRest(function(args) {
        var array = args[start],
            otherArgs = castSlice(args, 0, start);

        if (array) {
          arrayPush(otherArgs, array);
        }
        return apply(func, this, otherArgs);
      });
    }

    /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed `func` invocations and a `flush` method to
     * immediately invoke them. Provide `options` to indicate whether `func`
     * should be invoked on the leading and/or trailing edge of the `wait`
     * timeout. The `func` is invoked with the last arguments provided to the
     * throttled function. Subsequent calls to the throttled function return the
     * result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the throttled function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=true]
     *  Specify invoking on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // Avoid excessively updating the position while scrolling.
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
     * jQuery(element).on('click', throttled);
     *
     * // Cancel the trailing throttled invocation.
     * jQuery(window).on('popstate', throttled.cancel);
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        'leading': leading,
        'maxWait': wait,
        'trailing': trailing
      });
    }

    /**
     * Creates a function that accepts up to one argument, ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.unary(parseInt));
     * // => [6, 8, 10]
     */
    function unary(func) {
      return ary(func, 1);
    }

    /**
     * Creates a function that provides `value` to `wrapper` as its first
     * argument. Any additional arguments provided to the function are appended
     * to those provided to the `wrapper`. The wrapper is invoked with the `this`
     * binding of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {*} value The value to wrap.
     * @param {Function} [wrapper=identity] The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('fred, barney, & pebbles');
     * // => '<p>fred, barney, &amp; pebbles</p>'
     */
    function wrap(value, wrapper) {
      return partial(castFunction(wrapper), value);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Casts `value` as an array if it's not one.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Lang
     * @param {*} value The value to inspect.
     * @returns {Array} Returns the cast array.
     * @example
     *
     * _.castArray(1);
     * // => [1]
     *
     * _.castArray({ 'a': 1 });
     * // => [{ 'a': 1 }]
     *
     * _.castArray('abc');
     * // => ['abc']
     *
     * _.castArray(null);
     * // => [null]
     *
     * _.castArray(undefined);
     * // => [undefined]
     *
     * _.castArray();
     * // => []
     *
     * var array = [1, 2, 3];
     * console.log(_.castArray(array) === array);
     * // => true
     */
    function castArray() {
      if (!arguments.length) {
        return [];
      }
      var value = arguments[0];
      return isArray(value) ? value : [value];
    }

    /**
     * Creates a shallow clone of `value`.
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
     * and supports cloning arrays, array buffers, booleans, date objects, maps,
     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
     * arrays. The own enumerable properties of `arguments` objects are cloned
     * as plain objects. An empty object is returned for uncloneable values such
     * as error objects, functions, DOM nodes, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to clone.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeep
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var shallow = _.clone(objects);
     * console.log(shallow[0] === objects[0]);
     * // => true
     */
    function clone(value) {
      return baseClone(value, CLONE_SYMBOLS_FLAG);
    }

    /**
     * This method is like `_.clone` except that it accepts `customizer` which
     * is invoked to produce the cloned value. If `customizer` returns `undefined`,
     * cloning is handled by the method instead. The `customizer` is invoked with
     * up to four arguments; (value [, index|key, object, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeepWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * }
     *
     * var el = _.cloneWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 0
     */
    function cloneWith(value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
    }

    /**
     * This method is like `_.clone` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @returns {*} Returns the deep cloned value.
     * @see _.clone
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(objects);
     * console.log(deep[0] === objects[0]);
     * // => false
     */
    function cloneDeep(value) {
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
    }

    /**
     * This method is like `_.cloneWith` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the deep cloned value.
     * @see _.cloneWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * }
     *
     * var el = _.cloneDeepWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 20
     */
    function cloneDeepWith(value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
    }

    /**
     * Checks if `object` conforms to `source` by invoking the predicate
     * properties of `source` with the corresponding property values of `object`.
     *
     * **Note:** This method is equivalent to `_.conforms` when `source` is
     * partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
     * // => true
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
     * // => false
     */
    function conformsTo(object, source) {
      return source == null || baseConformsTo(object, source, keys(source));
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /**
     * Checks if `value` is greater than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     * @see _.lt
     * @example
     *
     * _.gt(3, 1);
     * // => true
     *
     * _.gt(3, 3);
     * // => false
     *
     * _.gt(1, 3);
     * // => false
     */
    var gt = createRelationalOperation(baseGt);

    /**
     * Checks if `value` is greater than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than or equal to
     *  `other`, else `false`.
     * @see _.lte
     * @example
     *
     * _.gte(3, 1);
     * // => true
     *
     * _.gte(3, 3);
     * // => true
     *
     * _.gte(1, 3);
     * // => false
     */
    var gte = createRelationalOperation(function(value, other) {
      return value >= other;
    });

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee');
    };

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /**
     * Checks if `value` is classified as an `ArrayBuffer` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     * @example
     *
     * _.isArrayBuffer(new ArrayBuffer(2));
     * // => true
     *
     * _.isArrayBuffer(new Array(2));
     * // => false
     */
    var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }

    /**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
     * @example
     *
     * _.isBoolean(false);
     * // => true
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false ||
        (isObjectLike(value) && baseGetTag(value) == boolTag);
    }

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;

    /**
     * Checks if `value` is classified as a `Date` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     *
     * _.isDate('Mon April 23 2012');
     * // => false
     */
    var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

    /**
     * Checks if `value` is likely a DOM element.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */
    function isElement(value) {
      return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
    }

    /**
     * Checks if `value` is an empty object, collection, map, or set.
     *
     * Objects are considered empty if they have no own enumerable string keyed
     * properties.
     *
     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
     * jQuery-like collections are considered empty if they have a `length` of `0`.
     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) &&
          (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
            isBuffer(value) || isTypedArray(value) || isArguments(value))) {
        return !value.length;
      }
      var tag = getTag(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
      if (isPrototype(value)) {
        return !baseKeys(value).length;
      }
      for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent.
     *
     * **Note:** This method supports comparing arrays, array buffers, booleans,
     * date objects, error objects, maps, numbers, `Object` objects, regexes,
     * sets, strings, symbols, and typed arrays. `Object` objects are compared
     * by their own, not inherited, enumerable properties. Functions and DOM
     * nodes are compared by strict equality, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.isEqual(object, other);
     * // => true
     *
     * object === other;
     * // => false
     */
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }

    /**
     * This method is like `_.isEqual` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with up to
     * six arguments: (objValue, othValue [, index|key, object, other, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, othValue) {
     *   if (isGreeting(objValue) && isGreeting(othValue)) {
     *     return true;
     *   }
     * }
     *
     * var array = ['hello', 'goodbye'];
     * var other = ['hi', 'goodbye'];
     *
     * _.isEqualWith(array, other, customizer);
     * // => true
     */
    function isEqualWith(value, other, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      var result = customizer ? customizer(value, other) : undefined;
      return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
    }

    /**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
    function isError(value) {
      if (!isObjectLike(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == errorTag || tag == domExcTag ||
        (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
    }

    /**
     * Checks if `value` is a finite primitive number.
     *
     * **Note:** This method is based on
     * [`Number.isFinite`](https://mdn.io/Number/isFinite).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
     * @example
     *
     * _.isFinite(3);
     * // => true
     *
     * _.isFinite(Number.MIN_VALUE);
     * // => true
     *
     * _.isFinite(Infinity);
     * // => false
     *
     * _.isFinite('3');
     * // => false
     */
    function isFinite(value) {
      return typeof value == 'number' && nativeIsFinite(value);
    }

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    /**
     * Checks if `value` is an integer.
     *
     * **Note:** This method is based on
     * [`Number.isInteger`](https://mdn.io/Number/isInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
     * @example
     *
     * _.isInteger(3);
     * // => true
     *
     * _.isInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isInteger(Infinity);
     * // => false
     *
     * _.isInteger('3');
     * // => false
     */
    function isInteger(value) {
      return typeof value == 'number' && value == toInteger(value);
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Map` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     * @example
     *
     * _.isMap(new Map);
     * // => true
     *
     * _.isMap(new WeakMap);
     * // => false
     */
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

    /**
     * Performs a partial deep comparison between `object` and `source` to
     * determine if `object` contains equivalent property values.
     *
     * **Note:** This method is equivalent to `_.matches` when `source` is
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.isMatch(object, { 'b': 2 });
     * // => true
     *
     * _.isMatch(object, { 'b': 1 });
     * // => false
     */
    function isMatch(object, source) {
      return object === source || baseIsMatch(object, source, getMatchData(source));
    }

    /**
     * This method is like `_.isMatch` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with five
     * arguments: (objValue, srcValue, index|key, object, source).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, srcValue) {
     *   if (isGreeting(objValue) && isGreeting(srcValue)) {
     *     return true;
     *   }
     * }
     *
     * var object = { 'greeting': 'hello' };
     * var source = { 'greeting': 'hi' };
     *
     * _.isMatchWith(object, source, customizer);
     * // => true
     */
    function isMatchWith(object, source, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseIsMatch(object, source, getMatchData(source), customizer);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * **Note:** This method is based on
     * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
     * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
     * `undefined` and other non-number values.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
    function isNaN(value) {
      // An `NaN` primitive is the only value that is not equal to itself.
      // Perform the `toStringTag` check first to avoid errors with some
      // ActiveX objects in IE.
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is a pristine native function.
     *
     * **Note:** This method can't reliably detect native functions in the presence
     * of the core-js package because core-js circumvents this kind of detection.
     * Despite multiple requests, the core-js maintainer has made it clear: any
     * attempt to fix the detection will be obstructed. As a result, we're left
     * with little choice but to throw an error. Unfortunately, this also affects
     * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
     * which rely on core-js.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */
    function isNative(value) {
      if (isMaskable(value)) {
        throw new Error(CORE_ERROR_TEXT);
      }
      return baseIsNative(value);
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(void 0);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is `null` or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
     * @example
     *
     * _.isNil(null);
     * // => true
     *
     * _.isNil(void 0);
     * // => true
     *
     * _.isNil(NaN);
     * // => false
     */
    function isNil(value) {
      return value == null;
    }

    /**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
     * classified as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a number, else `false`.
     * @example
     *
     * _.isNumber(3);
     * // => true
     *
     * _.isNumber(Number.MIN_VALUE);
     * // => true
     *
     * _.isNumber(Infinity);
     * // => true
     *
     * _.isNumber('3');
     * // => false
     */
    function isNumber(value) {
      return typeof value == 'number' ||
        (isObjectLike(value) && baseGetTag(value) == numberTag);
    }

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString.call(Ctor) == objectCtorString;
    }

    /**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     * @example
     *
     * _.isRegExp(/abc/);
     * // => true
     *
     * _.isRegExp('/abc/');
     * // => false
     */
    var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

    /**
     * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
     * double precision number which isn't the result of a rounded unsafe integer.
     *
     * **Note:** This method is based on
     * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
     * @example
     *
     * _.isSafeInteger(3);
     * // => true
     *
     * _.isSafeInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isSafeInteger(Infinity);
     * // => false
     *
     * _.isSafeInteger('3');
     * // => false
     */
    function isSafeInteger(value) {
      return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is classified as a `Set` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     * @example
     *
     * _.isSet(new Set);
     * // => true
     *
     * _.isSet(new WeakSet);
     * // => false
     */
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a string, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
    function isString(value) {
      return typeof value == 'string' ||
        (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && baseGetTag(value) == symbolTag);
    }

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */
    function isUndefined(value) {
      return value === undefined;
    }

    /**
     * Checks if `value` is classified as a `WeakMap` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
     * @example
     *
     * _.isWeakMap(new WeakMap);
     * // => true
     *
     * _.isWeakMap(new Map);
     * // => false
     */
    function isWeakMap(value) {
      return isObjectLike(value) && getTag(value) == weakMapTag;
    }

    /**
     * Checks if `value` is classified as a `WeakSet` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
     * @example
     *
     * _.isWeakSet(new WeakSet);
     * // => true
     *
     * _.isWeakSet(new Set);
     * // => false
     */
    function isWeakSet(value) {
      return isObjectLike(value) && baseGetTag(value) == weakSetTag;
    }

    /**
     * Checks if `value` is less than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     * @see _.gt
     * @example
     *
     * _.lt(1, 3);
     * // => true
     *
     * _.lt(3, 3);
     * // => false
     *
     * _.lt(3, 1);
     * // => false
     */
    var lt = createRelationalOperation(baseLt);

    /**
     * Checks if `value` is less than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than or equal to
     *  `other`, else `false`.
     * @see _.gte
     * @example
     *
     * _.lte(1, 3);
     * // => true
     *
     * _.lte(3, 3);
     * // => true
     *
     * _.lte(3, 1);
     * // => false
     */
    var lte = createRelationalOperation(function(value, other) {
      return value <= other;
    });

    /**
     * Converts `value` to an array.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * _.toArray({ 'a': 1, 'b': 2 });
     * // => [1, 2]
     *
     * _.toArray('abc');
     * // => ['a', 'b', 'c']
     *
     * _.toArray(1);
     * // => []
     *
     * _.toArray(null);
     * // => []
     */
    function toArray(value) {
      if (!value) {
        return [];
      }
      if (isArrayLike(value)) {
        return isString(value) ? stringToArray(value) : copyArray(value);
      }
      if (symIterator && value[symIterator]) {
        return iteratorToArray(value[symIterator]());
      }
      var tag = getTag(value),
          func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

      return func(value);
    }

    /**
     * Converts `value` to a finite number.
     *
     * @static
     * @memberOf _
     * @since 4.12.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted number.
     * @example
     *
     * _.toFinite(3.2);
     * // => 3.2
     *
     * _.toFinite(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toFinite(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3.2
     */
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }

    /**
     * Converts `value` to an integer.
     *
     * **Note:** This method is loosely based on
     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toInteger(3.2);
     * // => 3
     *
     * _.toInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toInteger(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3.2');
     * // => 3
     */
    function toInteger(value) {
      var result = toFinite(value),
          remainder = result % 1;

      return result === result ? (remainder ? result - remainder : result) : 0;
    }

    /**
     * Converts `value` to an integer suitable for use as the length of an
     * array-like object.
     *
     * **Note:** This method is based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toLength(3.2);
     * // => 3
     *
     * _.toLength(Number.MIN_VALUE);
     * // => 0
     *
     * _.toLength(Infinity);
     * // => 4294967295
     *
     * _.toLength('3.2');
     * // => 3
     */
    function toLength(value) {
      return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
    }

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = baseTrim(value);
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    /**
     * Converts `value` to a plain object flattening inherited enumerable string
     * keyed properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }

    /**
     * Converts `value` to a safe integer. A safe integer can be compared and
     * represented correctly.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toSafeInteger(3.2);
     * // => 3
     *
     * _.toSafeInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toSafeInteger(Infinity);
     * // => 9007199254740991
     *
     * _.toSafeInteger('3.2');
     * // => 3
     */
    function toSafeInteger(value) {
      return value
        ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
        : (value === 0 ? value : 0);
    }

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Assigns own enumerable string keyed properties of source objects to the
     * destination object. Source objects are applied from left to right.
     * Subsequent sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object` and is loosely based on
     * [`Object.assign`](https://mdn.io/Object/assign).
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assignIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assign({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'c': 3 }
     */
    var assign = createAssigner(function(object, source) {
      if (isPrototype(source) || isArrayLike(source)) {
        copyObject(source, keys(source), object);
        return;
      }
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          assignValue(object, key, source[key]);
        }
      }
    });

    /**
     * This method is like `_.assign` except that it iterates over own and
     * inherited source properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extend
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assign
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assignIn({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
     */
    var assignIn = createAssigner(function(object, source) {
      copyObject(source, keysIn(source), object);
    });

    /**
     * This method is like `_.assignIn` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extendWith
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignInWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keysIn(source), object, customizer);
    });

    /**
     * This method is like `_.assign` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignInWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keys(source), object, customizer);
    });

    /**
     * Creates an array of values corresponding to `paths` of `object`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Array} Returns the picked values.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _.at(object, ['a[0].b.c', 'a[1]']);
     * // => [3, 4]
     */
    var at = flatRest(baseAt);

    /**
     * Creates an object that inherits from the `prototype` object. If a
     * `properties` object is given, its own enumerable string keyed properties
     * are assigned to the created object.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Object
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     *   'constructor': Circle
     * });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
    function create(prototype, properties) {
      var result = baseCreate(prototype);
      return properties == null ? result : baseAssign(result, properties);
    }

    /**
     * Assigns own and inherited enumerable string keyed properties of source
     * objects to the destination object for all destination properties that
     * resolve to `undefined`. Source objects are applied from left to right.
     * Once a property is set, additional values of the same property are ignored.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaultsDeep
     * @example
     *
     * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var defaults = baseRest(function(object, sources) {
      object = Object(object);

      var index = -1;
      var length = sources.length;
      var guard = length > 2 ? sources[2] : undefined;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        length = 1;
      }

      while (++index < length) {
        var source = sources[index];
        var props = keysIn(source);
        var propsIndex = -1;
        var propsLength = props.length;

        while (++propsIndex < propsLength) {
          var key = props[propsIndex];
          var value = object[key];

          if (value === undefined ||
              (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
            object[key] = source[key];
          }
        }
      }

      return object;
    });

    /**
     * This method is like `_.defaults` except that it recursively assigns
     * default properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaults
     * @example
     *
     * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
     * // => { 'a': { 'b': 2, 'c': 3 } }
     */
    var defaultsDeep = baseRest(function(args) {
      args.push(undefined, customDefaultsMerge);
      return apply(mergeWith, undefined, args);
    });

    /**
     * This method is like `_.find` except that it returns the key of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findKey(users, function(o) { return o.age < 40; });
     * // => 'barney' (iteration order is not guaranteed)
     *
     * // The `_.matches` iteratee shorthand.
     * _.findKey(users, { 'age': 1, 'active': true });
     * // => 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findKey(users, 'active');
     * // => 'barney'
     */
    function findKey(object, predicate) {
      return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
    }

    /**
     * This method is like `_.findKey` except that it iterates over elements of
     * a collection in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findLastKey(users, function(o) { return o.age < 40; });
     * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastKey(users, { 'age': 36, 'active': true });
     * // => 'barney'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastKey(users, 'active');
     * // => 'pebbles'
     */
    function findLastKey(object, predicate) {
      return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
    }

    /**
     * Iterates over own and inherited enumerable string keyed properties of an
     * object and invokes `iteratee` for each property. The iteratee is invoked
     * with three arguments: (value, key, object). Iteratee functions may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forInRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forIn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
     */
    function forIn(object, iteratee) {
      return object == null
        ? object
        : baseFor(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * This method is like `_.forIn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forInRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
     */
    function forInRight(object, iteratee) {
      return object == null
        ? object
        : baseForRight(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * Iterates over own enumerable string keyed properties of an object and
     * invokes `iteratee` for each property. The iteratee is invoked with three
     * arguments: (value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwnRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forOwn(object, iteratee) {
      return object && baseForOwn(object, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.forOwn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwnRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
     */
    function forOwnRight(object, iteratee) {
      return object && baseForOwnRight(object, getIteratee(iteratee, 3));
    }

    /**
     * Creates an array of function property names from own enumerable properties
     * of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functionsIn
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functions(new Foo);
     * // => ['a', 'b']
     */
    function functions(object) {
      return object == null ? [] : baseFunctions(object, keys(object));
    }

    /**
     * Creates an array of function property names from own and inherited
     * enumerable properties of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functions
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functionsIn(new Foo);
     * // => ['a', 'b', 'c']
     */
    function functionsIn(object) {
      return object == null ? [] : baseFunctions(object, keysIn(object));
    }

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }

    /**
     * Checks if `path` is a direct property of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': 2 } };
     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b');
     * // => true
     *
     * _.has(object, ['a', 'b']);
     * // => true
     *
     * _.has(other, 'a');
     * // => false
     */
    function has(object, path) {
      return object != null && hasPath(object, path, baseHas);
    }

    /**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b');
     * // => true
     *
     * _.hasIn(object, ['a', 'b']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }

    /**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite
     * property assignments of previous values.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Object
     * @param {Object} object The object to invert.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     */
    var invert = createInverter(function(result, value, key) {
      if (value != null &&
          typeof value.toString != 'function') {
        value = nativeObjectToString.call(value);
      }

      result[value] = key;
    }, constant(identity));

    /**
     * This method is like `_.invert` except that the inverted object is generated
     * from the results of running each element of `object` thru `iteratee`. The
     * corresponding inverted value of each inverted key is an array of keys
     * responsible for generating the inverted value. The iteratee is invoked
     * with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Object
     * @param {Object} object The object to invert.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invertBy(object);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     *
     * _.invertBy(object, function(value) {
     *   return 'group' + value;
     * });
     * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
     */
    var invertBy = createInverter(function(result, value, key) {
      if (value != null &&
          typeof value.toString != 'function') {
        value = nativeObjectToString.call(value);
      }

      if (hasOwnProperty.call(result, value)) {
        result[value].push(key);
      } else {
        result[value] = [key];
      }
    }, getIteratee);

    /**
     * Invokes the method at `path` of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
     *
     * _.invoke(object, 'a[0].b.c.slice', 1, 3);
     * // => [2, 3]
     */
    var invoke = baseRest(baseInvoke);

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }

    /**
     * The opposite of `_.mapValues`; this method creates an object with the
     * same values as `object` and keys generated by running each own enumerable
     * string keyed property of `object` thru `iteratee`. The iteratee is invoked
     * with three arguments: (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapValues
     * @example
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
     *   return key + value;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */
    function mapKeys(object, iteratee) {
      var result = {};
      iteratee = getIteratee(iteratee, 3);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, iteratee(value, key, object), value);
      });
      return result;
    }

    /**
     * Creates an object with the same keys as `object` and values generated
     * by running each own enumerable string keyed property of `object` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapKeys
     * @example
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * _.mapValues(users, function(o) { return o.age; });
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     *
     * // The `_.property` iteratee shorthand.
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */
    function mapValues(object, iteratee) {
      var result = {};
      iteratee = getIteratee(iteratee, 3);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, key, iteratee(value, key, object));
      });
      return result;
    }

    /**
     * This method is like `_.assign` except that it recursively merges own and
     * inherited enumerable string keyed properties of source objects into the
     * destination object. Source properties that resolve to `undefined` are
     * skipped if a destination value exists. Array and plain object properties
     * are merged recursively. Other objects and value types are overridden by
     * assignment. Source objects are applied from left to right. Subsequent
     * sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {
     *   'a': [{ 'b': 2 }, { 'd': 4 }]
     * };
     *
     * var other = {
     *   'a': [{ 'c': 3 }, { 'e': 5 }]
     * };
     *
     * _.merge(object, other);
     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
     */
    var merge = createAssigner(function(object, source, srcIndex) {
      baseMerge(object, source, srcIndex);
    });

    /**
     * This method is like `_.merge` except that it accepts `customizer` which
     * is invoked to produce the merged values of the destination and source
     * properties. If `customizer` returns `undefined`, merging is handled by the
     * method instead. The `customizer` is invoked with six arguments:
     * (objValue, srcValue, key, object, source, stack).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   if (_.isArray(objValue)) {
     *     return objValue.concat(srcValue);
     *   }
     * }
     *
     * var object = { 'a': [1], 'b': [2] };
     * var other = { 'a': [3], 'b': [4] };
     *
     * _.mergeWith(object, other, customizer);
     * // => { 'a': [1, 3], 'b': [2, 4] }
     */
    var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
      baseMerge(object, source, srcIndex, customizer);
    });

    /**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable property paths of `object` that are not omitted.
     *
     * **Note:** This method is considerably slower than `_.pick`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to omit.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omit(object, ['a', 'c']);
     * // => { 'b': '2' }
     */
    var omit = flatRest(function(object, paths) {
      var result = {};
      if (object == null) {
        return result;
      }
      var isDeep = false;
      paths = arrayMap(paths, function(path) {
        path = castPath(path, object);
        isDeep || (isDeep = path.length > 1);
        return path;
      });
      copyObject(object, getAllKeysIn(object), result);
      if (isDeep) {
        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
      }
      var length = paths.length;
      while (length--) {
        baseUnset(result, paths[length]);
      }
      return result;
    });

    /**
     * The opposite of `_.pickBy`; this method creates an object composed of
     * the own and inherited enumerable string keyed properties of `object` that
     * `predicate` doesn't return truthy for. The predicate is invoked with two
     * arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omitBy(object, _.isNumber);
     * // => { 'b': '2' }
     */
    function omitBy(object, predicate) {
      return pickBy(object, negate(getIteratee(predicate)));
    }

    /**
     * Creates an object composed of the picked `object` properties.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pick(object, ['a', 'c']);
     * // => { 'a': 1, 'c': 3 }
     */
    var pick = flatRest(function(object, paths) {
      return object == null ? {} : basePick(object, paths);
    });

    /**
     * Creates an object composed of the `object` properties `predicate` returns
     * truthy for. The predicate is invoked with two arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pickBy(object, _.isNumber);
     * // => { 'a': 1, 'c': 3 }
     */
    function pickBy(object, predicate) {
      if (object == null) {
        return {};
      }
      var props = arrayMap(getAllKeysIn(object), function(prop) {
        return [prop];
      });
      predicate = getIteratee(predicate);
      return basePickBy(object, props, function(value, path) {
        return predicate(value, path[0]);
      });
    }

    /**
     * This method is like `_.get` except that if the resolved value is a
     * function it's invoked with the `this` binding of its parent object and
     * its result is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to resolve.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(object, 'a[0].b.c1');
     * // => 3
     *
     * _.result(object, 'a[0].b.c2');
     * // => 4
     *
     * _.result(object, 'a[0].b.c3', 'default');
     * // => 'default'
     *
     * _.result(object, 'a[0].b.c3', _.constant('default'));
     * // => 'default'
     */
    function result(object, path, defaultValue) {
      path = castPath(path, object);

      var index = -1,
          length = path.length;

      // Ensure the loop is entered when path is empty.
      if (!length) {
        length = 1;
        object = undefined;
      }
      while (++index < length) {
        var value = object == null ? undefined : object[toKey(path[index])];
        if (value === undefined) {
          index = length;
          value = defaultValue;
        }
        object = isFunction(value) ? value.call(object) : value;
      }
      return object;
    }

    /**
     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
     * it's created. Arrays are created for missing index properties while objects
     * are created for all other missing properties. Use `_.setWith` to customize
     * `path` creation.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, ['x', '0', 'y', 'z'], 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
    function set(object, path, value) {
      return object == null ? object : baseSet(object, path, value);
    }

    /**
     * This method is like `_.set` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.setWith(object, '[0][1]', 'a', Object);
     * // => { '0': { '1': 'a' } }
     */
    function setWith(object, path, value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return object == null ? object : baseSet(object, path, value, customizer);
    }

    /**
     * Creates an array of own enumerable string keyed-value pairs for `object`
     * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
     * entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entries
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairs(new Foo);
     * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
     */
    var toPairs = createToPairs(keys);

    /**
     * Creates an array of own and inherited enumerable string keyed-value pairs
     * for `object` which can be consumed by `_.fromPairs`. If `object` is a map
     * or set, its entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entriesIn
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairsIn(new Foo);
     * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
     */
    var toPairsIn = createToPairs(keysIn);

    /**
     * An alternative to `_.reduce`; this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own
     * enumerable string keyed properties thru `iteratee`, with each invocation
     * potentially mutating the `accumulator` object. If `accumulator` is not
     * provided, a new object with the same `[[Prototype]]` will be used. The
     * iteratee is invoked with four arguments: (accumulator, value, key, object).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.transform([2, 3, 4], function(result, n) {
     *   result.push(n *= n);
     *   return n % 2 == 0;
     * }, []);
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */
    function transform(object, iteratee, accumulator) {
      var isArr = isArray(object),
          isArrLike = isArr || isBuffer(object) || isTypedArray(object);

      iteratee = getIteratee(iteratee, 4);
      if (accumulator == null) {
        var Ctor = object && object.constructor;
        if (isArrLike) {
          accumulator = isArr ? new Ctor : [];
        }
        else if (isObject(object)) {
          accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
        }
        else {
          accumulator = {};
        }
      }
      (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
        return iteratee(accumulator, value, index, object);
      });
      return accumulator;
    }

    /**
     * Removes the property at `path` of `object`.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
     * _.unset(object, 'a[0].b.c');
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     *
     * _.unset(object, ['a', '0', 'b', 'c']);
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     */
    function unset(object, path) {
      return object == null ? true : baseUnset(object, path);
    }

    /**
     * This method is like `_.set` except that accepts `updater` to produce the
     * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
     * is invoked with one argument: (value).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.update(object, 'a[0].b.c', function(n) { return n * n; });
     * console.log(object.a[0].b.c);
     * // => 9
     *
     * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
     * console.log(object.x[0].y.z);
     * // => 0
     */
    function update(object, path, updater) {
      return object == null ? object : baseUpdate(object, path, castFunction(updater));
    }

    /**
     * This method is like `_.update` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.updateWith(object, '[0][1]', _.constant('a'), Object);
     * // => { '0': { '1': 'a' } }
     */
    function updateWith(object, path, updater, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
    }

    /**
     * Creates an array of the own enumerable string keyed property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */
    function values(object) {
      return object == null ? [] : baseValues(object, keys(object));
    }

    /**
     * Creates an array of the own and inherited enumerable string keyed property
     * values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.valuesIn(new Foo);
     * // => [1, 2, 3] (iteration order is not guaranteed)
     */
    function valuesIn(object) {
      return object == null ? [] : baseValues(object, keysIn(object));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Clamps `number` within the inclusive `lower` and `upper` bounds.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Number
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     * @example
     *
     * _.clamp(-10, -5, 5);
     * // => -5
     *
     * _.clamp(10, -5, 5);
     * // => 5
     */
    function clamp(number, lower, upper) {
      if (upper === undefined) {
        upper = lower;
        lower = undefined;
      }
      if (upper !== undefined) {
        upper = toNumber(upper);
        upper = upper === upper ? upper : 0;
      }
      if (lower !== undefined) {
        lower = toNumber(lower);
        lower = lower === lower ? lower : 0;
      }
      return baseClamp(toNumber(number), lower, upper);
    }

    /**
     * Checks if `n` is between `start` and up to, but not including, `end`. If
     * `end` is not specified, it's set to `start` with `start` then set to `0`.
     * If `start` is greater than `end` the params are swapped to support
     * negative ranges.
     *
     * @static
     * @memberOf _
     * @since 3.3.0
     * @category Number
     * @param {number} number The number to check.
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     * @see _.range, _.rangeRight
     * @example
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     *
     * _.inRange(-3, -2, -6);
     * // => true
     */
    function inRange(number, start, end) {
      start = toFinite(start);
      if (end === undefined) {
        end = start;
        start = 0;
      } else {
        end = toFinite(end);
      }
      number = toNumber(number);
      return baseInRange(number, start, end);
    }

    /**
     * Produces a random number between the inclusive `lower` and `upper` bounds.
     * If only one argument is provided a number between `0` and the given number
     * is returned. If `floating` is `true`, or either `lower` or `upper` are
     * floats, a floating-point number is returned instead of an integer.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Number
     * @param {number} [lower=0] The lower bound.
     * @param {number} [upper=1] The upper bound.
     * @param {boolean} [floating] Specify returning a floating-point number.
     * @returns {number} Returns the random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
    function random(lower, upper, floating) {
      if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
        upper = floating = undefined;
      }
      if (floating === undefined) {
        if (typeof upper == 'boolean') {
          floating = upper;
          upper = undefined;
        }
        else if (typeof lower == 'boolean') {
          floating = lower;
          lower = undefined;
        }
      }
      if (lower === undefined && upper === undefined) {
        lower = 0;
        upper = 1;
      }
      else {
        lower = toFinite(lower);
        if (upper === undefined) {
          upper = lower;
          lower = 0;
        } else {
          upper = toFinite(upper);
        }
      }
      if (lower > upper) {
        var temp = lower;
        lower = upper;
        upper = temp;
      }
      if (floating || lower % 1 || upper % 1) {
        var rand = nativeRandom();
        return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
      }
      return baseRandom(lower, upper);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar--');
     * // => 'fooBar'
     *
     * _.camelCase('__FOO_BAR__');
     * // => 'fooBar'
     */
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? capitalize(word) : word);
    });

    /**
     * Converts the first character of `string` to upper case and the remaining
     * to lower case.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('FRED');
     * // => 'Fred'
     */
    function capitalize(string) {
      return upperFirst(toString(string).toLowerCase());
    }

    /**
     * Deburrs `string` by converting
     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
     * letters to basic Latin letters and removing
     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
    function deburr(string) {
      string = toString(string);
      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
    }

    /**
     * Checks if `string` ends with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=string.length] The position to search up to.
     * @returns {boolean} Returns `true` if `string` ends with `target`,
     *  else `false`.
     * @example
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */
    function endsWith(string, target, position) {
      string = toString(string);
      target = baseToString(target);

      var length = string.length;
      position = position === undefined
        ? length
        : baseClamp(toInteger(position), 0, length);

      var end = position;
      position -= target.length;
      return position >= 0 && string.slice(position, end) == target;
    }

    /**
     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
     * corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional
     * characters use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value. See
     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * When working with HTML you should always
     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
     * XSS vectors.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
    function escape(string) {
      string = toString(string);
      return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar)
        : string;
    }

    /**
     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
     * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https://lodash\.com/\)'
     */
    function escapeRegExp(string) {
      string = toString(string);
      return (string && reHasRegExpChar.test(string))
        ? string.replace(reRegExpChar, '\\$&')
        : string;
    }

    /**
     * Converts `string` to
     * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the kebab cased string.
     * @example
     *
     * _.kebabCase('Foo Bar');
     * // => 'foo-bar'
     *
     * _.kebabCase('fooBar');
     * // => 'foo-bar'
     *
     * _.kebabCase('__FOO_BAR__');
     * // => 'foo-bar'
     */
    var kebabCase = createCompounder(function(result, word, index) {
      return result + (index ? '-' : '') + word.toLowerCase();
    });

    /**
     * Converts `string`, as space separated words, to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.lowerCase('--Foo-Bar--');
     * // => 'foo bar'
     *
     * _.lowerCase('fooBar');
     * // => 'foo bar'
     *
     * _.lowerCase('__FOO_BAR__');
     * // => 'foo bar'
     */
    var lowerCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + word.toLowerCase();
    });

    /**
     * Converts the first character of `string` to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.lowerFirst('Fred');
     * // => 'fred'
     *
     * _.lowerFirst('FRED');
     * // => 'fRED'
     */
    var lowerFirst = createCaseFirst('toLowerCase');

    /**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */
    function pad(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      if (!length || strLength >= length) {
        return string;
      }
      var mid = (length - strLength) / 2;
      return (
        createPadding(nativeFloor(mid), chars) +
        string +
        createPadding(nativeCeil(mid), chars)
      );
    }

    /**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padEnd('abc', 6);
     * // => 'abc   '
     *
     * _.padEnd('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padEnd('abc', 3);
     * // => 'abc'
     */
    function padEnd(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      return (length && strLength < length)
        ? (string + createPadding(length - strLength, chars))
        : string;
    }

    /**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padStart('abc', 6);
     * // => '   abc'
     *
     * _.padStart('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padStart('abc', 3);
     * // => 'abc'
     */
    function padStart(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      return (length && strLength < length)
        ? (createPadding(length - strLength, chars) + string)
        : string;
    }

    /**
     * Converts `string` to an integer of the specified radix. If `radix` is
     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
     * hexadecimal, in which case a `radix` of `16` is used.
     *
     * **Note:** This method aligns with the
     * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category String
     * @param {string} string The string to convert.
     * @param {number} [radix=10] The radix to interpret `value` by.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */
    function parseInt(string, radix, guard) {
      if (guard || radix == null) {
        radix = 0;
      } else if (radix) {
        radix = +radix;
      }
      return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
    }

    /**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=1] The number of times to repeat the string.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */
    function repeat(string, n, guard) {
      if ((guard ? isIterateeCall(string, n, guard) : n === undefined)) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      return baseRepeat(toString(string), n);
    }

    /**
     * Replaces matches for `pattern` in `string` with `replacement`.
     *
     * **Note:** This method is based on
     * [`String#replace`](https://mdn.io/String/replace).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to modify.
     * @param {RegExp|string} pattern The pattern to replace.
     * @param {Function|string} replacement The match replacement.
     * @returns {string} Returns the modified string.
     * @example
     *
     * _.replace('Hi Fred', 'Fred', 'Barney');
     * // => 'Hi Barney'
     */
    function replace() {
      var args = arguments,
          string = toString(args[0]);

      return args.length < 3 ? string : string.replace(args[1], args[2]);
    }

    /**
     * Converts `string` to
     * [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--FOO-BAR--');
     * // => 'foo_bar'
     */
    var snakeCase = createCompounder(function(result, word, index) {
      return result + (index ? '_' : '') + word.toLowerCase();
    });

    /**
     * Splits `string` by `separator`.
     *
     * **Note:** This method is based on
     * [`String#split`](https://mdn.io/String/split).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to split.
     * @param {RegExp|string} separator The separator pattern to split by.
     * @param {number} [limit] The length to truncate results to.
     * @returns {Array} Returns the string segments.
     * @example
     *
     * _.split('a-b-c', '-', 2);
     * // => ['a', 'b']
     */
    function split(string, separator, limit) {
      if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
        separator = limit = undefined;
      }
      limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
      if (!limit) {
        return [];
      }
      string = toString(string);
      if (string && (
            typeof separator == 'string' ||
            (separator != null && !isRegExp(separator))
          )) {
        separator = baseToString(separator);
        if (!separator && hasUnicode(string)) {
          return castSlice(stringToArray(string), 0, limit);
        }
      }
      return string.split(separator, limit);
    }

    /**
     * Converts `string` to
     * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
     *
     * @static
     * @memberOf _
     * @since 3.1.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the start cased string.
     * @example
     *
     * _.startCase('--foo-bar--');
     * // => 'Foo Bar'
     *
     * _.startCase('fooBar');
     * // => 'Foo Bar'
     *
     * _.startCase('__FOO_BAR__');
     * // => 'FOO BAR'
     */
    var startCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + upperFirst(word);
    });

    /**
     * Checks if `string` starts with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=0] The position to search from.
     * @returns {boolean} Returns `true` if `string` starts with `target`,
     *  else `false`.
     * @example
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */
    function startsWith(string, target, position) {
      string = toString(string);
      position = position == null
        ? 0
        : baseClamp(toInteger(position), 0, string.length);

      target = baseToString(target);
      return string.slice(position, position + target.length) == target;
    }

    /**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is given, it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options={}] The options object.
     * @param {RegExp} [options.escape=_.templateSettings.escape]
     *  The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
     *  The "evaluate" delimiter.
     * @param {Object} [options.imports=_.templateSettings.imports]
     *  An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
     *  The "interpolate" delimiter.
     * @param {string} [options.sourceURL='lodash.templateSources[n]']
     *  The sourceURL of the compiled template.
     * @param {string} [options.variable='obj']
     *  The data object variable name.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // Use the "interpolate" delimiter to create a compiled template.
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // Use the HTML "escape" delimiter to escape data property values.
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the internal `print` function in "evaluate" delimiters.
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // Use the ES template literal delimiter as an "interpolate" delimiter.
     * // Disable support by replacing the "interpolate" delimiter.
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // Use backslashes to treat delimiters as plain text.
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // Use the `imports` option to import `jQuery` as `jq`.
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
     *
     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // Use custom template delimiters.
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // Use the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and stack traces.
     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(string, options, guard) {
      // Based on John Resig's `tmpl` implementation
      // (http://ejohn.org/blog/javascript-micro-templating/)
      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
      var settings = lodash.templateSettings;

      if (guard && isIterateeCall(string, options, guard)) {
        options = undefined;
      }
      string = toString(string);
      options = assignInWith({}, options, settings, customDefaultsAssignIn);

      var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);

      var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // Compile the regexp to match each delimiter.
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      // Use a sourceURL for easier debugging.
      // The sourceURL gets injected into the source that's eval-ed, so be careful
      // to normalize all kinds of whitespace, so e.g. newlines (and unicode versions of it) can't sneak in
      // and escape the comment, thus injecting code that gets evaled.
      var sourceURL = '//# sourceURL=' +
        (hasOwnProperty.call(options, 'sourceURL')
          ? (options.sourceURL + '').replace(/\s/g, ' ')
          : ('lodash.templateSources[' + (++templateCounter) + ']')
        ) + '\n';

      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // Escape characters that can't be included in string literals.
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // Replace delimiters with snippets.
        if (escapeValue) {
          isEscaping = true;
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // The JS engine embedded in Adobe products needs `match` returned in
        // order to produce the correct `offset` value.
        return match;
      });

      source += "';\n";

      // If `variable` is not specified wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain.
      var variable = hasOwnProperty.call(options, 'variable') && options.variable;
      if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
      }
      // Throw an error if a forbidden character was found in `variable`, to prevent
      // potential command injection attacks.
      else if (reForbiddenIdentifierChars.test(variable)) {
        throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);
      }

      // Cleanup code by stripping empty strings.
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // Frame code as the function body.
      source = 'function(' + (variable || 'obj') + ') {\n' +
        (variable
          ? ''
          : 'obj || (obj = {});\n'
        ) +
        "var __t, __p = ''" +
        (isEscaping
           ? ', __e = _.escape'
           : ''
        ) +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      var result = attempt(function() {
        return Function(importsKeys, sourceURL + 'return ' + source)
          .apply(undefined, importsValues);
      });

      // Provide the compiled function's source by its `toString` method or
      // the `source` property as a convenience for inlining compiled templates.
      result.source = source;
      if (isError(result)) {
        throw result;
      }
      return result;
    }

    /**
     * Converts `string`, as a whole, to lower case just like
     * [String#toLowerCase](https://mdn.io/toLowerCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.toLower('--Foo-Bar--');
     * // => '--foo-bar--'
     *
     * _.toLower('fooBar');
     * // => 'foobar'
     *
     * _.toLower('__FOO_BAR__');
     * // => '__foo_bar__'
     */
    function toLower(value) {
      return toString(value).toLowerCase();
    }

    /**
     * Converts `string`, as a whole, to upper case just like
     * [String#toUpperCase](https://mdn.io/toUpperCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.toUpper('--foo-bar--');
     * // => '--FOO-BAR--'
     *
     * _.toUpper('fooBar');
     * // => 'FOOBAR'
     *
     * _.toUpper('__foo_bar__');
     * // => '__FOO_BAR__'
     */
    function toUpper(value) {
      return toString(value).toUpperCase();
    }

    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return baseTrim(string);
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          chrSymbols = stringToArray(chars),
          start = charsStartIndex(strSymbols, chrSymbols),
          end = charsEndIndex(strSymbols, chrSymbols) + 1;

      return castSlice(strSymbols, start, end).join('');
    }

    /**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimEnd('  abc  ');
     * // => '  abc'
     *
     * _.trimEnd('-_-abc-_-', '_-');
     * // => '-_-abc'
     */
    function trimEnd(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.slice(0, trimmedEndIndex(string) + 1);
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

      return castSlice(strSymbols, 0, end).join('');
    }

    /**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimStart('  abc  ');
     * // => 'abc  '
     *
     * _.trimStart('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */
    function trimStart(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrimStart, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          start = charsStartIndex(strSymbols, stringToArray(chars));

      return castSlice(strSymbols, start).join('');
    }

    /**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object} [options={}] The options object.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.truncate('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */
    function truncate(string, options) {
      var length = DEFAULT_TRUNC_LENGTH,
          omission = DEFAULT_TRUNC_OMISSION;

      if (isObject(options)) {
        var separator = 'separator' in options ? options.separator : separator;
        length = 'length' in options ? toInteger(options.length) : length;
        omission = 'omission' in options ? baseToString(options.omission) : omission;
      }
      string = toString(string);

      var strLength = string.length;
      if (hasUnicode(string)) {
        var strSymbols = stringToArray(string);
        strLength = strSymbols.length;
      }
      if (length >= strLength) {
        return string;
      }
      var end = length - stringSize(omission);
      if (end < 1) {
        return omission;
      }
      var result = strSymbols
        ? castSlice(strSymbols, 0, end).join('')
        : string.slice(0, end);

      if (separator === undefined) {
        return result + omission;
      }
      if (strSymbols) {
        end += (result.length - end);
      }
      if (isRegExp(separator)) {
        if (string.slice(end).search(separator)) {
          var match,
              substring = result;

          if (!separator.global) {
            separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
          }
          separator.lastIndex = 0;
          while ((match = separator.exec(substring))) {
            var newEnd = match.index;
          }
          result = result.slice(0, newEnd === undefined ? end : newEnd);
        }
      } else if (string.indexOf(baseToString(separator), end) != end) {
        var index = result.lastIndexOf(separator);
        if (index > -1) {
          result = result.slice(0, index);
        }
      }
      return result + omission;
    }

    /**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
     * their corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional
     * HTML entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @since 0.6.0
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */
    function unescape(string) {
      string = toString(string);
      return (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, unescapeHtmlChar)
        : string;
    }

    /**
     * Converts `string`, as space separated words, to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.upperCase('--foo-bar');
     * // => 'FOO BAR'
     *
     * _.upperCase('fooBar');
     * // => 'FOO BAR'
     *
     * _.upperCase('__foo_bar__');
     * // => 'FOO BAR'
     */
    var upperCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + word.toUpperCase();
    });

    /**
     * Converts the first character of `string` to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.upperFirst('fred');
     * // => 'Fred'
     *
     * _.upperFirst('FRED');
     * // => 'FRED'
     */
    var upperFirst = createCaseFirst('toUpperCase');

    /**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
    function words(string, pattern, guard) {
      string = toString(string);
      pattern = guard ? undefined : pattern;

      if (pattern === undefined) {
        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
      }
      return string.match(pattern) || [];
    }

    /*------------------------------------------------------------------------*/

    /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Function} func The function to attempt.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // Avoid throwing errors for invalid selectors.
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */
    var attempt = baseRest(function(func, args) {
      try {
        return apply(func, undefined, args);
      } catch (e) {
        return isError(e) ? e : new Error(e);
      }
    });

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method.
     *
     * **Note:** This method doesn't set the "length" property of bound functions.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...(string|string[])} methodNames The object method names to bind.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'click': function() {
     *     console.log('clicked ' + this.label);
     *   }
     * };
     *
     * _.bindAll(view, ['click']);
     * jQuery(element).on('click', view.click);
     * // => Logs 'clicked docs' when clicked.
     */
    var bindAll = flatRest(function(object, methodNames) {
      arrayEach(methodNames, function(key) {
        key = toKey(key);
        baseAssignValue(object, key, bind(object[key], object));
      });
      return object;
    });

    /**
     * Creates a function that iterates over `pairs` and invokes the corresponding
     * function of the first predicate to return truthy. The predicate-function
     * pairs are invoked with the `this` binding and arguments of the created
     * function.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Array} pairs The predicate-function pairs.
     * @returns {Function} Returns the new composite function.
     * @example
     *
     * var func = _.cond([
     *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
     *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
     *   [_.stubTrue,                      _.constant('no match')]
     * ]);
     *
     * func({ 'a': 1, 'b': 2 });
     * // => 'matches A'
     *
     * func({ 'a': 0, 'b': 1 });
     * // => 'matches B'
     *
     * func({ 'a': '1', 'b': '2' });
     * // => 'no match'
     */
    function cond(pairs) {
      var length = pairs == null ? 0 : pairs.length,
          toIteratee = getIteratee();

      pairs = !length ? [] : arrayMap(pairs, function(pair) {
        if (typeof pair[1] != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        return [toIteratee(pair[0]), pair[1]];
      });

      return baseRest(function(args) {
        var index = -1;
        while (++index < length) {
          var pair = pairs[index];
          if (apply(pair[0], this, args)) {
            return apply(pair[1], this, args);
          }
        }
      });
    }

    /**
     * Creates a function that invokes the predicate properties of `source` with
     * the corresponding property values of a given object, returning `true` if
     * all predicates return truthy, else `false`.
     *
     * **Note:** The created function is equivalent to `_.conformsTo` with
     * `source` partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 2, 'b': 1 },
     *   { 'a': 1, 'b': 2 }
     * ];
     *
     * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
     * // => [{ 'a': 1, 'b': 2 }]
     */
    function conforms(source) {
      return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * Checks `value` to determine whether a default value should be returned in
     * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
     * or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Util
     * @param {*} value The value to check.
     * @param {*} defaultValue The default value.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * _.defaultTo(1, 10);
     * // => 1
     *
     * _.defaultTo(undefined, 10);
     * // => 10
     */
    function defaultTo(value, defaultValue) {
      return (value == null || value !== value) ? defaultValue : value;
    }

    /**
     * Creates a function that returns the result of invoking the given functions
     * with the `this` binding of the created function, where each successive
     * invocation is supplied the return value of the previous.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flowRight
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flow([_.add, square]);
     * addSquare(1, 2);
     * // => 9
     */
    var flow = createFlow();

    /**
     * This method is like `_.flow` except that it creates a function that
     * invokes the given functions from right to left.
     *
     * @static
     * @since 3.0.0
     * @memberOf _
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flow
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flowRight([square, _.add]);
     * addSquare(1, 2);
     * // => 9
     */
    var flowRight = createFlow(true);

    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Creates a function that invokes `func` with the arguments of the created
     * function. If `func` is a property name, the created function returns the
     * property value for a given element. If `func` is an array or object, the
     * created function returns `true` for elements that contain the equivalent
     * source properties, otherwise it returns `false`.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Util
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @returns {Function} Returns the callback.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
     * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, _.iteratee(['user', 'fred']));
     * // => [{ 'user': 'fred', 'age': 40 }]
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, _.iteratee('user'));
     * // => ['barney', 'fred']
     *
     * // Create custom iteratee shorthands.
     * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
     *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
     *     return func.test(string);
     *   };
     * });
     *
     * _.filter(['abc', 'def'], /ef/);
     * // => ['def']
     */
    function iteratee(func) {
      return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that performs a partial deep comparison between a given
     * object and `source`, returning `true` if the given object has equivalent
     * property values, else `false`.
     *
     * **Note:** The created function is equivalent to `_.isMatch` with `source`
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * **Note:** Multiple values can be checked by combining several matchers
     * using `_.overSome`
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
     * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
     *
     * // Checking for several possible values
     * _.filter(objects, _.overSome([_.matches({ 'a': 1 }), _.matches({ 'a': 4 })]));
     * // => [{ 'a': 1, 'b': 2, 'c': 3 }, { 'a': 4, 'b': 5, 'c': 6 }]
     */
    function matches(source) {
      return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that performs a partial deep comparison between the
     * value at `path` of a given object to `srcValue`, returning `true` if the
     * object value is equivalent, else `false`.
     *
     * **Note:** Partial comparisons will match empty array and empty object
     * `srcValue` values against any array or object value, respectively. See
     * `_.isEqual` for a list of supported value comparisons.
     *
     * **Note:** Multiple values can be checked by combining several matchers
     * using `_.overSome`
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.find(objects, _.matchesProperty('a', 4));
     * // => { 'a': 4, 'b': 5, 'c': 6 }
     *
     * // Checking for several possible values
     * _.filter(objects, _.overSome([_.matchesProperty('a', 1), _.matchesProperty('a', 4)]));
     * // => [{ 'a': 1, 'b': 2, 'c': 3 }, { 'a': 4, 'b': 5, 'c': 6 }]
     */
    function matchesProperty(path, srcValue) {
      return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that invokes the method at `path` of a given object.
     * Any additional arguments are provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': _.constant(2) } },
     *   { 'a': { 'b': _.constant(1) } }
     * ];
     *
     * _.map(objects, _.method('a.b'));
     * // => [2, 1]
     *
     * _.map(objects, _.method(['a', 'b']));
     * // => [2, 1]
     */
    var method = baseRest(function(path, args) {
      return function(object) {
        return baseInvoke(object, path, args);
      };
    });

    /**
     * The opposite of `_.method`; this method creates a function that invokes
     * the method at a given path of `object`. Any additional arguments are
     * provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Object} object The object to query.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var array = _.times(3, _.constant),
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
     * // => [2, 0]
     */
    var methodOf = baseRest(function(object, args) {
      return function(path) {
        return baseInvoke(object, path, args);
      };
    });

    /**
     * Adds all own enumerable string keyed function properties of a source
     * object to the destination object. If `object` is a function, then methods
     * are added to its prototype as well.
     *
     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
     * avoid conflicts caused by modifying the original.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Function|Object} [object=lodash] The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
     * @returns {Function|Object} Returns `object`.
     * @example
     *
     * function vowels(string) {
     *   return _.filter(string, function(v) {
     *     return /[aeiou]/i.test(v);
     *   });
     * }
     *
     * _.mixin({ 'vowels': vowels });
     * _.vowels('fred');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'vowels': vowels }, { 'chain': false });
     * _('fred').vowels();
     * // => ['e']
     */
    function mixin(object, source, options) {
      var props = keys(source),
          methodNames = baseFunctions(source, props);

      if (options == null &&
          !(isObject(source) && (methodNames.length || !props.length))) {
        options = source;
        source = object;
        object = this;
        methodNames = baseFunctions(source, keys(source));
      }
      var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
          isFunc = isFunction(object);

      arrayEach(methodNames, function(methodName) {
        var func = source[methodName];
        object[methodName] = func;
        if (isFunc) {
          object.prototype[methodName] = function() {
            var chainAll = this.__chain__;
            if (chain || chainAll) {
              var result = object(this.__wrapped__),
                  actions = result.__actions__ = copyArray(this.__actions__);

              actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
              result.__chain__ = chainAll;
              return result;
            }
            return func.apply(object, arrayPush([this.value()], arguments));
          };
        }
      });

      return object;
    }

    /**
     * Reverts the `_` variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
    function noConflict() {
      if (root._ === this) {
        root._ = oldDash;
      }
      return this;
    }

    /**
     * This method returns `undefined`.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Util
     * @example
     *
     * _.times(2, _.noop);
     * // => [undefined, undefined]
     */
    function noop() {
      // No operation performed.
    }

    /**
     * Creates a function that gets the argument at index `n`. If `n` is negative,
     * the nth argument from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [n=0] The index of the argument to return.
     * @returns {Function} Returns the new pass-thru function.
     * @example
     *
     * var func = _.nthArg(1);
     * func('a', 'b', 'c', 'd');
     * // => 'b'
     *
     * var func = _.nthArg(-2);
     * func('a', 'b', 'c', 'd');
     * // => 'c'
     */
    function nthArg(n) {
      n = toInteger(n);
      return baseRest(function(args) {
        return baseNth(args, n);
      });
    }

    /**
     * Creates a function that invokes `iteratees` with the arguments it receives
     * and returns their results.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.over([Math.max, Math.min]);
     *
     * func(1, 2, 3, 4);
     * // => [4, 1]
     */
    var over = createOver(arrayMap);

    /**
     * Creates a function that checks if **all** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * Following shorthands are possible for providing predicates.
     * Pass an `Object` and it will be used as an parameter for `_.matches` to create the predicate.
     * Pass an `Array` of parameters for `_.matchesProperty` and the predicate will be created using them.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overEvery([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => false
     *
     * func(NaN);
     * // => false
     */
    var overEvery = createOver(arrayEvery);

    /**
     * Creates a function that checks if **any** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * Following shorthands are possible for providing predicates.
     * Pass an `Object` and it will be used as an parameter for `_.matches` to create the predicate.
     * Pass an `Array` of parameters for `_.matchesProperty` and the predicate will be created using them.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overSome([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => true
     *
     * func(NaN);
     * // => false
     *
     * var matchesFunc = _.overSome([{ 'a': 1 }, { 'a': 2 }])
     * var matchesPropertyFunc = _.overSome([['a', 1], ['a', 2]])
     */
    var overSome = createOver(arraySome);

    /**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': 2 } },
     *   { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(objects, _.property('a.b'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
     * // => [1, 2]
     */
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }

    /**
     * The opposite of `_.property`; this method creates a function that returns
     * the value at a given path of `object`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var array = [0, 1, 2],
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */
    function propertyOf(object) {
      return function(path) {
        return object == null ? undefined : baseGet(object, path);
      };
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. A step of `-1` is used if a negative
     * `start` is specified without an `end` or `step`. If `end` is not specified,
     * it's set to `start` with `start` then set to `0`.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.rangeRight
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(-4);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
    var range = createRange();

    /**
     * This method is like `_.range` except that it populates values in
     * descending order.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.range
     * @example
     *
     * _.rangeRight(4);
     * // => [3, 2, 1, 0]
     *
     * _.rangeRight(-4);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 5);
     * // => [4, 3, 2, 1]
     *
     * _.rangeRight(0, 20, 5);
     * // => [15, 10, 5, 0]
     *
     * _.rangeRight(0, -4, -1);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.rangeRight(0);
     * // => []
     */
    var rangeRight = createRange(true);

    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
      return [];
    }

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    /**
     * This method returns a new empty object.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Object} Returns the new empty object.
     * @example
     *
     * var objects = _.times(2, _.stubObject);
     *
     * console.log(objects);
     * // => [{}, {}]
     *
     * console.log(objects[0] === objects[1]);
     * // => false
     */
    function stubObject() {
      return {};
    }

    /**
     * This method returns an empty string.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {string} Returns the empty string.
     * @example
     *
     * _.times(2, _.stubString);
     * // => ['', '']
     */
    function stubString() {
      return '';
    }

    /**
     * This method returns `true`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `true`.
     * @example
     *
     * _.times(2, _.stubTrue);
     * // => [true, true]
     */
    function stubTrue() {
      return true;
    }

    /**
     * Invokes the iteratee `n` times, returning an array of the results of
     * each invocation. The iteratee is invoked with one argument; (index).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.times(3, String);
     * // => ['0', '1', '2']
     *
     *  _.times(4, _.constant(0));
     * // => [0, 0, 0, 0]
     */
    function times(n, iteratee) {
      n = toInteger(n);
      if (n < 1 || n > MAX_SAFE_INTEGER) {
        return [];
      }
      var index = MAX_ARRAY_LENGTH,
          length = nativeMin(n, MAX_ARRAY_LENGTH);

      iteratee = getIteratee(iteratee);
      n -= MAX_ARRAY_LENGTH;

      var result = baseTimes(length, iteratee);
      while (++index < n) {
        iteratee(index);
      }
      return result;
    }

    /**
     * Converts `value` to a property path array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {*} value The value to convert.
     * @returns {Array} Returns the new property path array.
     * @example
     *
     * _.toPath('a.b.c');
     * // => ['a', 'b', 'c']
     *
     * _.toPath('a[0].b.c');
     * // => ['a', '0', 'b', 'c']
     */
    function toPath(value) {
      if (isArray(value)) {
        return arrayMap(value, toKey);
      }
      return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
    }

    /**
     * Generates a unique ID. If `prefix` is given, the ID is appended to it.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {string} [prefix=''] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return toString(prefix) + id;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {number} augend The first number in an addition.
     * @param {number} addend The second number in an addition.
     * @returns {number} Returns the total.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */
    var add = createMathOperation(function(augend, addend) {
      return augend + addend;
    }, 0);

    /**
     * Computes `number` rounded up to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round up.
     * @param {number} [precision=0] The precision to round up to.
     * @returns {number} Returns the rounded up number.
     * @example
     *
     * _.ceil(4.006);
     * // => 5
     *
     * _.ceil(6.004, 2);
     * // => 6.01
     *
     * _.ceil(6040, -2);
     * // => 6100
     */
    var ceil = createRound('ceil');

    /**
     * Divide two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} dividend The first number in a division.
     * @param {number} divisor The second number in a division.
     * @returns {number} Returns the quotient.
     * @example
     *
     * _.divide(6, 4);
     * // => 1.5
     */
    var divide = createMathOperation(function(dividend, divisor) {
      return dividend / divisor;
    }, 1);

    /**
     * Computes `number` rounded down to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round down.
     * @param {number} [precision=0] The precision to round down to.
     * @returns {number} Returns the rounded down number.
     * @example
     *
     * _.floor(4.006);
     * // => 4
     *
     * _.floor(0.046, 2);
     * // => 0.04
     *
     * _.floor(4060, -2);
     * // => 4000
     */
    var floor = createRound('floor');

    /**
     * Computes the maximum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => undefined
     */
    function max(array) {
      return (array && array.length)
        ? baseExtremum(array, identity, baseGt)
        : undefined;
    }

    /**
     * This method is like `_.max` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.maxBy(objects, function(o) { return o.n; });
     * // => { 'n': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.maxBy(objects, 'n');
     * // => { 'n': 2 }
     */
    function maxBy(array, iteratee) {
      return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseGt)
        : undefined;
    }

    /**
     * Computes the mean of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the mean.
     * @example
     *
     * _.mean([4, 2, 8, 6]);
     * // => 5
     */
    function mean(array) {
      return baseMean(array, identity);
    }

    /**
     * This method is like `_.mean` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be averaged.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the mean.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.meanBy(objects, function(o) { return o.n; });
     * // => 5
     *
     * // The `_.property` iteratee shorthand.
     * _.meanBy(objects, 'n');
     * // => 5
     */
    function meanBy(array, iteratee) {
      return baseMean(array, getIteratee(iteratee, 2));
    }

    /**
     * Computes the minimum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => undefined
     */
    function min(array) {
      return (array && array.length)
        ? baseExtremum(array, identity, baseLt)
        : undefined;
    }

    /**
     * This method is like `_.min` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.minBy(objects, function(o) { return o.n; });
     * // => { 'n': 1 }
     *
     * // The `_.property` iteratee shorthand.
     * _.minBy(objects, 'n');
     * // => { 'n': 1 }
     */
    function minBy(array, iteratee) {
      return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
        : undefined;
    }

    /**
     * Multiply two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} multiplier The first number in a multiplication.
     * @param {number} multiplicand The second number in a multiplication.
     * @returns {number} Returns the product.
     * @example
     *
     * _.multiply(6, 4);
     * // => 24
     */
    var multiply = createMathOperation(function(multiplier, multiplicand) {
      return multiplier * multiplicand;
    }, 1);

    /**
     * Computes `number` rounded to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round.
     * @param {number} [precision=0] The precision to round to.
     * @returns {number} Returns the rounded number.
     * @example
     *
     * _.round(4.006);
     * // => 4
     *
     * _.round(4.006, 2);
     * // => 4.01
     *
     * _.round(4060, -2);
     * // => 4100
     */
    var round = createRound('round');

    /**
     * Subtract two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {number} minuend The first number in a subtraction.
     * @param {number} subtrahend The second number in a subtraction.
     * @returns {number} Returns the difference.
     * @example
     *
     * _.subtract(6, 4);
     * // => 2
     */
    var subtract = createMathOperation(function(minuend, subtrahend) {
      return minuend - subtrahend;
    }, 0);

    /**
     * Computes the sum of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.sum([4, 2, 8, 6]);
     * // => 20
     */
    function sum(array) {
      return (array && array.length)
        ? baseSum(array, identity)
        : 0;
    }

    /**
     * This method is like `_.sum` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be summed.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the sum.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.sumBy(objects, function(o) { return o.n; });
     * // => 20
     *
     * // The `_.property` iteratee shorthand.
     * _.sumBy(objects, 'n');
     * // => 20
     */
    function sumBy(array, iteratee) {
      return (array && array.length)
        ? baseSum(array, getIteratee(iteratee, 2))
        : 0;
    }

    /*------------------------------------------------------------------------*/

    // Add methods that return wrapped values in chain sequences.
    lodash.after = after;
    lodash.ary = ary;
    lodash.assign = assign;
    lodash.assignIn = assignIn;
    lodash.assignInWith = assignInWith;
    lodash.assignWith = assignWith;
    lodash.at = at;
    lodash.before = before;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.castArray = castArray;
    lodash.chain = chain;
    lodash.chunk = chunk;
    lodash.compact = compact;
    lodash.concat = concat;
    lodash.cond = cond;
    lodash.conforms = conforms;
    lodash.constant = constant;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.curry = curry;
    lodash.curryRight = curryRight;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defaultsDeep = defaultsDeep;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.differenceBy = differenceBy;
    lodash.differenceWith = differenceWith;
    lodash.drop = drop;
    lodash.dropRight = dropRight;
    lodash.dropRightWhile = dropRightWhile;
    lodash.dropWhile = dropWhile;
    lodash.fill = fill;
    lodash.filter = filter;
    lodash.flatMap = flatMap;
    lodash.flatMapDeep = flatMapDeep;
    lodash.flatMapDepth = flatMapDepth;
    lodash.flatten = flatten;
    lodash.flattenDeep = flattenDeep;
    lodash.flattenDepth = flattenDepth;
    lodash.flip = flip;
    lodash.flow = flow;
    lodash.flowRight = flowRight;
    lodash.fromPairs = fromPairs;
    lodash.functions = functions;
    lodash.functionsIn = functionsIn;
    lodash.groupBy = groupBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.intersectionBy = intersectionBy;
    lodash.intersectionWith = intersectionWith;
    lodash.invert = invert;
    lodash.invertBy = invertBy;
    lodash.invokeMap = invokeMap;
    lodash.iteratee = iteratee;
    lodash.keyBy = keyBy;
    lodash.keys = keys;
    lodash.keysIn = keysIn;
    lodash.map = map;
    lodash.mapKeys = mapKeys;
    lodash.mapValues = mapValues;
    lodash.matches = matches;
    lodash.matchesProperty = matchesProperty;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.mergeWith = mergeWith;
    lodash.method = method;
    lodash.methodOf = methodOf;
    lodash.mixin = mixin;
    lodash.negate = negate;
    lodash.nthArg = nthArg;
    lodash.omit = omit;
    lodash.omitBy = omitBy;
    lodash.once = once;
    lodash.orderBy = orderBy;
    lodash.over = over;
    lodash.overArgs = overArgs;
    lodash.overEvery = overEvery;
    lodash.overSome = overSome;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.partition = partition;
    lodash.pick = pick;
    lodash.pickBy = pickBy;
    lodash.property = property;
    lodash.propertyOf = propertyOf;
    lodash.pull = pull;
    lodash.pullAll = pullAll;
    lodash.pullAllBy = pullAllBy;
    lodash.pullAllWith = pullAllWith;
    lodash.pullAt = pullAt;
    lodash.range = range;
    lodash.rangeRight = rangeRight;
    lodash.rearg = rearg;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.reverse = reverse;
    lodash.sampleSize = sampleSize;
    lodash.set = set;
    lodash.setWith = setWith;
    lodash.shuffle = shuffle;
    lodash.slice = slice;
    lodash.sortBy = sortBy;
    lodash.sortedUniq = sortedUniq;
    lodash.sortedUniqBy = sortedUniqBy;
    lodash.split = split;
    lodash.spread = spread;
    lodash.tail = tail;
    lodash.take = take;
    lodash.takeRight = takeRight;
    lodash.takeRightWhile = takeRightWhile;
    lodash.takeWhile = takeWhile;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.thru = thru;
    lodash.toArray = toArray;
    lodash.toPairs = toPairs;
    lodash.toPairsIn = toPairsIn;
    lodash.toPath = toPath;
    lodash.toPlainObject = toPlainObject;
    lodash.transform = transform;
    lodash.unary = unary;
    lodash.union = union;
    lodash.unionBy = unionBy;
    lodash.unionWith = unionWith;
    lodash.uniq = uniq;
    lodash.uniqBy = uniqBy;
    lodash.uniqWith = uniqWith;
    lodash.unset = unset;
    lodash.unzip = unzip;
    lodash.unzipWith = unzipWith;
    lodash.update = update;
    lodash.updateWith = updateWith;
    lodash.values = values;
    lodash.valuesIn = valuesIn;
    lodash.without = without;
    lodash.words = words;
    lodash.wrap = wrap;
    lodash.xor = xor;
    lodash.xorBy = xorBy;
    lodash.xorWith = xorWith;
    lodash.zip = zip;
    lodash.zipObject = zipObject;
    lodash.zipObjectDeep = zipObjectDeep;
    lodash.zipWith = zipWith;

    // Add aliases.
    lodash.entries = toPairs;
    lodash.entriesIn = toPairsIn;
    lodash.extend = assignIn;
    lodash.extendWith = assignInWith;

    // Add methods to `lodash.prototype`.
    mixin(lodash, lodash);

    /*------------------------------------------------------------------------*/

    // Add methods that return unwrapped values in chain sequences.
    lodash.add = add;
    lodash.attempt = attempt;
    lodash.camelCase = camelCase;
    lodash.capitalize = capitalize;
    lodash.ceil = ceil;
    lodash.clamp = clamp;
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.cloneDeepWith = cloneDeepWith;
    lodash.cloneWith = cloneWith;
    lodash.conformsTo = conformsTo;
    lodash.deburr = deburr;
    lodash.defaultTo = defaultTo;
    lodash.divide = divide;
    lodash.endsWith = endsWith;
    lodash.eq = eq;
    lodash.escape = escape;
    lodash.escapeRegExp = escapeRegExp;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.floor = floor;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.get = get;
    lodash.gt = gt;
    lodash.gte = gte;
    lodash.has = has;
    lodash.hasIn = hasIn;
    lodash.head = head;
    lodash.identity = identity;
    lodash.includes = includes;
    lodash.indexOf = indexOf;
    lodash.inRange = inRange;
    lodash.invoke = invoke;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isArrayBuffer = isArrayBuffer;
    lodash.isArrayLike = isArrayLike;
    lodash.isArrayLikeObject = isArrayLikeObject;
    lodash.isBoolean = isBoolean;
    lodash.isBuffer = isBuffer;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isEqualWith = isEqualWith;
    lodash.isError = isError;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isInteger = isInteger;
    lodash.isLength = isLength;
    lodash.isMap = isMap;
    lodash.isMatch = isMatch;
    lodash.isMatchWith = isMatchWith;
    lodash.isNaN = isNaN;
    lodash.isNative = isNative;
    lodash.isNil = isNil;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isObjectLike = isObjectLike;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isSafeInteger = isSafeInteger;
    lodash.isSet = isSet;
    lodash.isString = isString;
    lodash.isSymbol = isSymbol;
    lodash.isTypedArray = isTypedArray;
    lodash.isUndefined = isUndefined;
    lodash.isWeakMap = isWeakMap;
    lodash.isWeakSet = isWeakSet;
    lodash.join = join;
    lodash.kebabCase = kebabCase;
    lodash.last = last;
    lodash.lastIndexOf = lastIndexOf;
    lodash.lowerCase = lowerCase;
    lodash.lowerFirst = lowerFirst;
    lodash.lt = lt;
    lodash.lte = lte;
    lodash.max = max;
    lodash.maxBy = maxBy;
    lodash.mean = mean;
    lodash.meanBy = meanBy;
    lodash.min = min;
    lodash.minBy = minBy;
    lodash.stubArray = stubArray;
    lodash.stubFalse = stubFalse;
    lodash.stubObject = stubObject;
    lodash.stubString = stubString;
    lodash.stubTrue = stubTrue;
    lodash.multiply = multiply;
    lodash.nth = nth;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.now = now;
    lodash.pad = pad;
    lodash.padEnd = padEnd;
    lodash.padStart = padStart;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.repeat = repeat;
    lodash.replace = replace;
    lodash.result = result;
    lodash.round = round;
    lodash.runInContext = runInContext;
    lodash.sample = sample;
    lodash.size = size;
    lodash.snakeCase = snakeCase;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.sortedIndexBy = sortedIndexBy;
    lodash.sortedIndexOf = sortedIndexOf;
    lodash.sortedLastIndex = sortedLastIndex;
    lodash.sortedLastIndexBy = sortedLastIndexBy;
    lodash.sortedLastIndexOf = sortedLastIndexOf;
    lodash.startCase = startCase;
    lodash.startsWith = startsWith;
    lodash.subtract = subtract;
    lodash.sum = sum;
    lodash.sumBy = sumBy;
    lodash.template = template;
    lodash.times = times;
    lodash.toFinite = toFinite;
    lodash.toInteger = toInteger;
    lodash.toLength = toLength;
    lodash.toLower = toLower;
    lodash.toNumber = toNumber;
    lodash.toSafeInteger = toSafeInteger;
    lodash.toString = toString;
    lodash.toUpper = toUpper;
    lodash.trim = trim;
    lodash.trimEnd = trimEnd;
    lodash.trimStart = trimStart;
    lodash.truncate = truncate;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;
    lodash.upperCase = upperCase;
    lodash.upperFirst = upperFirst;

    // Add aliases.
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.first = head;

    mixin(lodash, (function() {
      var source = {};
      baseForOwn(lodash, function(func, methodName) {
        if (!hasOwnProperty.call(lodash.prototype, methodName)) {
          source[methodName] = func;
        }
      });
      return source;
    }()), { 'chain': false });

    /*------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type {string}
     */
    lodash.VERSION = VERSION;

    // Assign default placeholders.
    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
      lodash[methodName].placeholder = lodash;
    });

    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
    arrayEach(['drop', 'take'], function(methodName, index) {
      LazyWrapper.prototype[methodName] = function(n) {
        n = n === undefined ? 1 : nativeMax(toInteger(n), 0);

        var result = (this.__filtered__ && !index)
          ? new LazyWrapper(this)
          : this.clone();

        if (result.__filtered__) {
          result.__takeCount__ = nativeMin(n, result.__takeCount__);
        } else {
          result.__views__.push({
            'size': nativeMin(n, MAX_ARRAY_LENGTH),
            'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
          });
        }
        return result;
      };

      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
        return this.reverse()[methodName](n).reverse();
      };
    });

    // Add `LazyWrapper` methods that accept an `iteratee` value.
    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
      var type = index + 1,
          isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;

      LazyWrapper.prototype[methodName] = function(iteratee) {
        var result = this.clone();
        result.__iteratees__.push({
          'iteratee': getIteratee(iteratee, 3),
          'type': type
        });
        result.__filtered__ = result.__filtered__ || isFilter;
        return result;
      };
    });

    // Add `LazyWrapper` methods for `_.head` and `_.last`.
    arrayEach(['head', 'last'], function(methodName, index) {
      var takeName = 'take' + (index ? 'Right' : '');

      LazyWrapper.prototype[methodName] = function() {
        return this[takeName](1).value()[0];
      };
    });

    // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
    arrayEach(['initial', 'tail'], function(methodName, index) {
      var dropName = 'drop' + (index ? '' : 'Right');

      LazyWrapper.prototype[methodName] = function() {
        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
      };
    });

    LazyWrapper.prototype.compact = function() {
      return this.filter(identity);
    };

    LazyWrapper.prototype.find = function(predicate) {
      return this.filter(predicate).head();
    };

    LazyWrapper.prototype.findLast = function(predicate) {
      return this.reverse().find(predicate);
    };

    LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
      if (typeof path == 'function') {
        return new LazyWrapper(this);
      }
      return this.map(function(value) {
        return baseInvoke(value, path, args);
      });
    });

    LazyWrapper.prototype.reject = function(predicate) {
      return this.filter(negate(getIteratee(predicate)));
    };

    LazyWrapper.prototype.slice = function(start, end) {
      start = toInteger(start);

      var result = this;
      if (result.__filtered__ && (start > 0 || end < 0)) {
        return new LazyWrapper(result);
      }
      if (start < 0) {
        result = result.takeRight(-start);
      } else if (start) {
        result = result.drop(start);
      }
      if (end !== undefined) {
        end = toInteger(end);
        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
      }
      return result;
    };

    LazyWrapper.prototype.takeRightWhile = function(predicate) {
      return this.reverse().takeWhile(predicate).reverse();
    };

    LazyWrapper.prototype.toArray = function() {
      return this.take(MAX_ARRAY_LENGTH);
    };

    // Add `LazyWrapper` methods to `lodash.prototype`.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
          isTaker = /^(?:head|last)$/.test(methodName),
          lodashFunc = lodash[isTaker ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName],
          retUnwrapped = isTaker || /^find/.test(methodName);

      if (!lodashFunc) {
        return;
      }
      lodash.prototype[methodName] = function() {
        var value = this.__wrapped__,
            args = isTaker ? [1] : arguments,
            isLazy = value instanceof LazyWrapper,
            iteratee = args[0],
            useLazy = isLazy || isArray(value);

        var interceptor = function(value) {
          var result = lodashFunc.apply(lodash, arrayPush([value], args));
          return (isTaker && chainAll) ? result[0] : result;
        };

        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
          // Avoid lazy use if the iteratee has a "length" value other than `1`.
          isLazy = useLazy = false;
        }
        var chainAll = this.__chain__,
            isHybrid = !!this.__actions__.length,
            isUnwrapped = retUnwrapped && !chainAll,
            onlyLazy = isLazy && !isHybrid;

        if (!retUnwrapped && useLazy) {
          value = onlyLazy ? value : new LazyWrapper(this);
          var result = func.apply(value, args);
          result.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined });
          return new LodashWrapper(result, chainAll);
        }
        if (isUnwrapped && onlyLazy) {
          return func.apply(this, args);
        }
        result = this.thru(interceptor);
        return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
      };
    });

    // Add `Array` methods to `lodash.prototype`.
    arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
      var func = arrayProto[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:pop|shift)$/.test(methodName);

      lodash.prototype[methodName] = function() {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
          var value = this.value();
          return func.apply(isArray(value) ? value : [], args);
        }
        return this[chainName](function(value) {
          return func.apply(isArray(value) ? value : [], args);
        });
      };
    });

    // Map minified method names to their real names.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var lodashFunc = lodash[methodName];
      if (lodashFunc) {
        var key = lodashFunc.name + '';
        if (!hasOwnProperty.call(realNames, key)) {
          realNames[key] = [];
        }
        realNames[key].push({ 'name': methodName, 'func': lodashFunc });
      }
    });

    realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
      'name': 'wrapper',
      'func': undefined
    }];

    // Add methods to `LazyWrapper`.
    LazyWrapper.prototype.clone = lazyClone;
    LazyWrapper.prototype.reverse = lazyReverse;
    LazyWrapper.prototype.value = lazyValue;

    // Add chain sequence methods to the `lodash` wrapper.
    lodash.prototype.at = wrapperAt;
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.commit = wrapperCommit;
    lodash.prototype.next = wrapperNext;
    lodash.prototype.plant = wrapperPlant;
    lodash.prototype.reverse = wrapperReverse;
    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

    // Add lazy aliases.
    lodash.prototype.first = lodash.prototype.head;

    if (symIterator) {
      lodash.prototype[symIterator] = wrapperToIterator;
    }
    return lodash;
  });

  /*--------------------------------------------------------------------------*/

  // Export lodash.
  var _ = runInContext();

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (true) {
    // Expose Lodash on the global object to prevent errors when Lodash is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    // Use `_.noConflict` to remove Lodash from the global object.
    root._ = _;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return _;
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else {}
}.call(this));


/***/ }),

/***/ 4556:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;;(function(root, factory) {
    // istanbul ignore next
    if (true) {
        // istanbul ignore next
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
    } else {}
})(
    typeof self !== "undefined"
        ? // istanbul ignore next
          self
        : this,
    function() {
        // references
        // https://hackernoon.com/the-madness-of-parsing-real-world-javascript-regexps-d9ee336df983
        // https://www.ecma-international.org/ecma-262/8.0/index.html#prod-Pattern
        function RegExpParser() {}

        RegExpParser.prototype.saveState = function() {
            return {
                idx: this.idx,
                input: this.input,
                groupIdx: this.groupIdx
            }
        }

        RegExpParser.prototype.restoreState = function(newState) {
            this.idx = newState.idx
            this.input = newState.input
            this.groupIdx = newState.groupIdx
        }

        RegExpParser.prototype.pattern = function(input) {
            // parser state
            this.idx = 0
            this.input = input
            this.groupIdx = 0

            this.consumeChar("/")
            var value = this.disjunction()
            this.consumeChar("/")

            var flags = {
                type: "Flags",
                loc: { begin: this.idx, end: input.length },
                global: false,
                ignoreCase: false,
                multiLine: false,
                unicode: false,
                sticky: false
            }

            while (this.isRegExpFlag()) {
                switch (this.popChar()) {
                    case "g":
                        addFlag(flags, "global")
                        break
                    case "i":
                        addFlag(flags, "ignoreCase")
                        break
                    case "m":
                        addFlag(flags, "multiLine")
                        break
                    case "u":
                        addFlag(flags, "unicode")
                        break
                    case "y":
                        addFlag(flags, "sticky")
                        break
                }
            }

            if (this.idx !== this.input.length) {
                throw Error(
                    "Redundant input: " + this.input.substring(this.idx)
                )
            }
            return {
                type: "Pattern",
                flags: flags,
                value: value,
                loc: this.loc(0)
            }
        }

        RegExpParser.prototype.disjunction = function() {
            var alts = []
            var begin = this.idx

            alts.push(this.alternative())

            while (this.peekChar() === "|") {
                this.consumeChar("|")
                alts.push(this.alternative())
            }

            return { type: "Disjunction", value: alts, loc: this.loc(begin) }
        }

        RegExpParser.prototype.alternative = function() {
            var terms = []
            var begin = this.idx

            while (this.isTerm()) {
                terms.push(this.term())
            }

            return { type: "Alternative", value: terms, loc: this.loc(begin) }
        }

        RegExpParser.prototype.term = function() {
            if (this.isAssertion()) {
                return this.assertion()
            } else {
                return this.atom()
            }
        }

        RegExpParser.prototype.assertion = function() {
            var begin = this.idx
            switch (this.popChar()) {
                case "^":
                    return {
                        type: "StartAnchor",
                        loc: this.loc(begin)
                    }
                case "$":
                    return { type: "EndAnchor", loc: this.loc(begin) }
                // '\b' or '\B'
                case "\\":
                    switch (this.popChar()) {
                        case "b":
                            return {
                                type: "WordBoundary",
                                loc: this.loc(begin)
                            }
                        case "B":
                            return {
                                type: "NonWordBoundary",
                                loc: this.loc(begin)
                            }
                    }
                    // istanbul ignore next
                    throw Error("Invalid Assertion Escape")
                // '(?=' or '(?!'
                case "(":
                    this.consumeChar("?")

                    var type
                    switch (this.popChar()) {
                        case "=":
                            type = "Lookahead"
                            break
                        case "!":
                            type = "NegativeLookahead"
                            break
                    }
                    ASSERT_EXISTS(type)

                    var disjunction = this.disjunction()

                    this.consumeChar(")")

                    return {
                        type: type,
                        value: disjunction,
                        loc: this.loc(begin)
                    }
            }
            // istanbul ignore next
            ASSERT_NEVER_REACH_HERE()
        }

        RegExpParser.prototype.quantifier = function(isBacktracking) {
            var range
            var begin = this.idx
            switch (this.popChar()) {
                case "*":
                    range = {
                        atLeast: 0,
                        atMost: Infinity
                    }
                    break
                case "+":
                    range = {
                        atLeast: 1,
                        atMost: Infinity
                    }
                    break
                case "?":
                    range = {
                        atLeast: 0,
                        atMost: 1
                    }
                    break
                case "{":
                    var atLeast = this.integerIncludingZero()
                    switch (this.popChar()) {
                        case "}":
                            range = {
                                atLeast: atLeast,
                                atMost: atLeast
                            }
                            break
                        case ",":
                            var atMost
                            if (this.isDigit()) {
                                atMost = this.integerIncludingZero()
                                range = {
                                    atLeast: atLeast,
                                    atMost: atMost
                                }
                            } else {
                                range = {
                                    atLeast: atLeast,
                                    atMost: Infinity
                                }
                            }
                            this.consumeChar("}")
                            break
                    }
                    // throwing exceptions from "ASSERT_EXISTS" during backtracking
                    // causes severe performance degradations
                    if (isBacktracking === true && range === undefined) {
                        return undefined
                    }
                    ASSERT_EXISTS(range)
                    break
            }

            // throwing exceptions from "ASSERT_EXISTS" during backtracking
            // causes severe performance degradations
            if (isBacktracking === true && range === undefined) {
                return undefined
            }

            ASSERT_EXISTS(range)

            if (this.peekChar(0) === "?") {
                this.consumeChar("?")
                range.greedy = false
            } else {
                range.greedy = true
            }

            range.type = "Quantifier"
            range.loc = this.loc(begin)
            return range
        }

        RegExpParser.prototype.atom = function() {
            var atom
            var begin = this.idx
            switch (this.peekChar()) {
                case ".":
                    atom = this.dotAll()
                    break
                case "\\":
                    atom = this.atomEscape()
                    break
                case "[":
                    atom = this.characterClass()
                    break
                case "(":
                    atom = this.group()
                    break
            }

            if (atom === undefined && this.isPatternCharacter()) {
                atom = this.patternCharacter()
            }

            ASSERT_EXISTS(atom)

            atom.loc = this.loc(begin)

            if (this.isQuantifier()) {
                atom.quantifier = this.quantifier()
            }

            return atom
        }

        RegExpParser.prototype.dotAll = function() {
            this.consumeChar(".")
            return {
                type: "Set",
                complement: true,
                value: [cc("\n"), cc("\r"), cc("\u2028"), cc("\u2029")]
            }
        }

        RegExpParser.prototype.atomEscape = function() {
            this.consumeChar("\\")

            switch (this.peekChar()) {
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    return this.decimalEscapeAtom()
                case "d":
                case "D":
                case "s":
                case "S":
                case "w":
                case "W":
                    return this.characterClassEscape()
                case "f":
                case "n":
                case "r":
                case "t":
                case "v":
                    return this.controlEscapeAtom()
                case "c":
                    return this.controlLetterEscapeAtom()
                case "0":
                    return this.nulCharacterAtom()
                case "x":
                    return this.hexEscapeSequenceAtom()
                case "u":
                    return this.regExpUnicodeEscapeSequenceAtom()
                default:
                    return this.identityEscapeAtom()
            }
        }

        RegExpParser.prototype.decimalEscapeAtom = function() {
            var value = this.positiveInteger()

            return { type: "GroupBackReference", value: value }
        }

        RegExpParser.prototype.characterClassEscape = function() {
            var set
            var complement = false
            switch (this.popChar()) {
                case "d":
                    set = digitsCharCodes
                    break
                case "D":
                    set = digitsCharCodes
                    complement = true
                    break
                case "s":
                    set = whitespaceCodes
                    break
                case "S":
                    set = whitespaceCodes
                    complement = true
                    break
                case "w":
                    set = wordCharCodes
                    break
                case "W":
                    set = wordCharCodes
                    complement = true
                    break
            }

            ASSERT_EXISTS(set)

            return { type: "Set", value: set, complement: complement }
        }

        RegExpParser.prototype.controlEscapeAtom = function() {
            var escapeCode
            switch (this.popChar()) {
                case "f":
                    escapeCode = cc("\f")
                    break
                case "n":
                    escapeCode = cc("\n")
                    break
                case "r":
                    escapeCode = cc("\r")
                    break
                case "t":
                    escapeCode = cc("\t")
                    break
                case "v":
                    escapeCode = cc("\v")
                    break
            }
            ASSERT_EXISTS(escapeCode)

            return { type: "Character", value: escapeCode }
        }

        RegExpParser.prototype.controlLetterEscapeAtom = function() {
            this.consumeChar("c")
            var letter = this.popChar()
            if (/[a-zA-Z]/.test(letter) === false) {
                throw Error("Invalid ")
            }

            var letterCode = letter.toUpperCase().charCodeAt(0) - 64
            return { type: "Character", value: letterCode }
        }

        RegExpParser.prototype.nulCharacterAtom = function() {
            // TODO implement '[lookahead ∉ DecimalDigit]'
            // TODO: for the deprecated octal escape sequence
            this.consumeChar("0")
            return { type: "Character", value: cc("\0") }
        }

        RegExpParser.prototype.hexEscapeSequenceAtom = function() {
            this.consumeChar("x")
            return this.parseHexDigits(2)
        }

        RegExpParser.prototype.regExpUnicodeEscapeSequenceAtom = function() {
            this.consumeChar("u")
            return this.parseHexDigits(4)
        }

        RegExpParser.prototype.identityEscapeAtom = function() {
            // TODO: implement "SourceCharacter but not UnicodeIDContinue"
            // // http://unicode.org/reports/tr31/#Specific_Character_Adjustments
            var escapedChar = this.popChar()
            return { type: "Character", value: cc(escapedChar) }
        }

        RegExpParser.prototype.classPatternCharacterAtom = function() {
            switch (this.peekChar()) {
                // istanbul ignore next
                case "\n":
                // istanbul ignore next
                case "\r":
                // istanbul ignore next
                case "\u2028":
                // istanbul ignore next
                case "\u2029":
                // istanbul ignore next
                case "\\":
                // istanbul ignore next
                case "]":
                    throw Error("TBD")
                default:
                    var nextChar = this.popChar()
                    return { type: "Character", value: cc(nextChar) }
            }
        }

        RegExpParser.prototype.characterClass = function() {
            var set = []
            var complement = false
            this.consumeChar("[")
            if (this.peekChar(0) === "^") {
                this.consumeChar("^")
                complement = true
            }

            while (this.isClassAtom()) {
                var from = this.classAtom()
                var isFromSingleChar = from.type === "Character"
                if (isFromSingleChar && this.isRangeDash()) {
                    this.consumeChar("-")
                    var to = this.classAtom()
                    var isToSingleChar = to.type === "Character"

                    // a range can only be used when both sides are single characters
                    if (isToSingleChar) {
                        if (to.value < from.value) {
                            throw Error("Range out of order in character class")
                        }
                        set.push({ from: from.value, to: to.value })
                    } else {
                        // literal dash
                        insertToSet(from.value, set)
                        set.push(cc("-"))
                        insertToSet(to.value, set)
                    }
                } else {
                    insertToSet(from.value, set)
                }
            }

            this.consumeChar("]")

            return { type: "Set", complement: complement, value: set }
        }

        RegExpParser.prototype.classAtom = function() {
            switch (this.peekChar()) {
                // istanbul ignore next
                case "]":
                // istanbul ignore next
                case "\n":
                // istanbul ignore next
                case "\r":
                // istanbul ignore next
                case "\u2028":
                // istanbul ignore next
                case "\u2029":
                    throw Error("TBD")
                case "\\":
                    return this.classEscape()
                default:
                    return this.classPatternCharacterAtom()
            }
        }

        RegExpParser.prototype.classEscape = function() {
            this.consumeChar("\\")
            switch (this.peekChar()) {
                // Matches a backspace.
                // (Not to be confused with \b word boundary outside characterClass)
                case "b":
                    this.consumeChar("b")
                    return { type: "Character", value: cc("\u0008") }
                case "d":
                case "D":
                case "s":
                case "S":
                case "w":
                case "W":
                    return this.characterClassEscape()
                case "f":
                case "n":
                case "r":
                case "t":
                case "v":
                    return this.controlEscapeAtom()
                case "c":
                    return this.controlLetterEscapeAtom()
                case "0":
                    return this.nulCharacterAtom()
                case "x":
                    return this.hexEscapeSequenceAtom()
                case "u":
                    return this.regExpUnicodeEscapeSequenceAtom()
                default:
                    return this.identityEscapeAtom()
            }
        }

        RegExpParser.prototype.group = function() {
            var capturing = true
            this.consumeChar("(")
            switch (this.peekChar(0)) {
                case "?":
                    this.consumeChar("?")
                    this.consumeChar(":")
                    capturing = false
                    break
                default:
                    this.groupIdx++
                    break
            }
            var value = this.disjunction()
            this.consumeChar(")")

            var groupAst = {
                type: "Group",
                capturing: capturing,
                value: value
            }

            if (capturing) {
                groupAst.idx = this.groupIdx
            }

            return groupAst
        }

        RegExpParser.prototype.positiveInteger = function() {
            var number = this.popChar()

            // istanbul ignore next - can't ever get here due to previous lookahead checks
            // still implementing this error checking in case this ever changes.
            if (decimalPatternNoZero.test(number) === false) {
                throw Error("Expecting a positive integer")
            }

            while (decimalPattern.test(this.peekChar(0))) {
                number += this.popChar()
            }

            return parseInt(number, 10)
        }

        RegExpParser.prototype.integerIncludingZero = function() {
            var number = this.popChar()
            if (decimalPattern.test(number) === false) {
                throw Error("Expecting an integer")
            }

            while (decimalPattern.test(this.peekChar(0))) {
                number += this.popChar()
            }

            return parseInt(number, 10)
        }

        RegExpParser.prototype.patternCharacter = function() {
            var nextChar = this.popChar()
            switch (nextChar) {
                // istanbul ignore next
                case "\n":
                // istanbul ignore next
                case "\r":
                // istanbul ignore next
                case "\u2028":
                // istanbul ignore next
                case "\u2029":
                // istanbul ignore next
                case "^":
                // istanbul ignore next
                case "$":
                // istanbul ignore next
                case "\\":
                // istanbul ignore next
                case ".":
                // istanbul ignore next
                case "*":
                // istanbul ignore next
                case "+":
                // istanbul ignore next
                case "?":
                // istanbul ignore next
                case "(":
                // istanbul ignore next
                case ")":
                // istanbul ignore next
                case "[":
                // istanbul ignore next
                case "|":
                    // istanbul ignore next
                    throw Error("TBD")
                default:
                    return { type: "Character", value: cc(nextChar) }
            }
        }
        RegExpParser.prototype.isRegExpFlag = function() {
            switch (this.peekChar(0)) {
                case "g":
                case "i":
                case "m":
                case "u":
                case "y":
                    return true
                default:
                    return false
            }
        }

        RegExpParser.prototype.isRangeDash = function() {
            return this.peekChar() === "-" && this.isClassAtom(1)
        }

        RegExpParser.prototype.isDigit = function() {
            return decimalPattern.test(this.peekChar(0))
        }

        RegExpParser.prototype.isClassAtom = function(howMuch) {
            if (howMuch === undefined) {
                howMuch = 0
            }

            switch (this.peekChar(howMuch)) {
                case "]":
                case "\n":
                case "\r":
                case "\u2028":
                case "\u2029":
                    return false
                default:
                    return true
            }
        }

        RegExpParser.prototype.isTerm = function() {
            return this.isAtom() || this.isAssertion()
        }

        RegExpParser.prototype.isAtom = function() {
            if (this.isPatternCharacter()) {
                return true
            }

            switch (this.peekChar(0)) {
                case ".":
                case "\\": // atomEscape
                case "[": // characterClass
                // TODO: isAtom must be called before isAssertion - disambiguate
                case "(": // group
                    return true
                default:
                    return false
            }
        }

        RegExpParser.prototype.isAssertion = function() {
            switch (this.peekChar(0)) {
                case "^":
                case "$":
                    return true
                // '\b' or '\B'
                case "\\":
                    switch (this.peekChar(1)) {
                        case "b":
                        case "B":
                            return true
                        default:
                            return false
                    }
                // '(?=' or '(?!'
                case "(":
                    return (
                        this.peekChar(1) === "?" &&
                        (this.peekChar(2) === "=" || this.peekChar(2) === "!")
                    )
                default:
                    return false
            }
        }

        RegExpParser.prototype.isQuantifier = function() {
            var prevState = this.saveState()
            try {
                return this.quantifier(true) !== undefined
            } catch (e) {
                return false
            } finally {
                this.restoreState(prevState)
            }
        }

        RegExpParser.prototype.isPatternCharacter = function() {
            switch (this.peekChar()) {
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
                case "\u2029":
                    return false
                default:
                    return true
            }
        }

        RegExpParser.prototype.parseHexDigits = function(howMany) {
            var hexString = ""
            for (var i = 0; i < howMany; i++) {
                var hexChar = this.popChar()
                if (hexDigitPattern.test(hexChar) === false) {
                    throw Error("Expecting a HexDecimal digits")
                }
                hexString += hexChar
            }
            var charCode = parseInt(hexString, 16)
            return { type: "Character", value: charCode }
        }

        RegExpParser.prototype.peekChar = function(howMuch) {
            if (howMuch === undefined) {
                howMuch = 0
            }
            return this.input[this.idx + howMuch]
        }

        RegExpParser.prototype.popChar = function() {
            var nextChar = this.peekChar(0)
            this.consumeChar()
            return nextChar
        }

        RegExpParser.prototype.consumeChar = function(char) {
            if (char !== undefined && this.input[this.idx] !== char) {
                throw Error(
                    "Expected: '" +
                        char +
                        "' but found: '" +
                        this.input[this.idx] +
                        "' at offset: " +
                        this.idx
                )
            }

            if (this.idx >= this.input.length) {
                throw Error("Unexpected end of input")
            }
            this.idx++
        }

        RegExpParser.prototype.loc = function(begin) {
            return { begin: begin, end: this.idx }
        }

        // consts and utilities
        var hexDigitPattern = /[0-9a-fA-F]/
        var decimalPattern = /[0-9]/
        var decimalPatternNoZero = /[1-9]/

        function cc(char) {
            return char.charCodeAt(0)
        }

        function insertToSet(item, set) {
            if (item.length !== undefined) {
                item.forEach(function(subItem) {
                    set.push(subItem)
                })
            } else {
                set.push(item)
            }
        }

        function addFlag(flagObj, flagKey) {
            if (flagObj[flagKey] === true) {
                throw "duplicate flag " + flagKey
            }

            flagObj[flagKey] = true
        }

        function ASSERT_EXISTS(obj) {
            // istanbul ignore next
            if (obj === undefined) {
                throw Error("Internal Error - Should never get here!")
            }
        }

        // istanbul ignore next
        function ASSERT_NEVER_REACH_HERE() {
            throw Error("Internal Error - Should never get here!")
        }

        var i
        var digitsCharCodes = []
        for (i = cc("0"); i <= cc("9"); i++) {
            digitsCharCodes.push(i)
        }

        var wordCharCodes = [cc("_")].concat(digitsCharCodes)
        for (i = cc("a"); i <= cc("z"); i++) {
            wordCharCodes.push(i)
        }

        for (i = cc("A"); i <= cc("Z"); i++) {
            wordCharCodes.push(i)
        }

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#character-classes
        var whitespaceCodes = [
            cc(" "),
            cc("\f"),
            cc("\n"),
            cc("\r"),
            cc("\t"),
            cc("\v"),
            cc("\t"),
            cc("\u00a0"),
            cc("\u1680"),
            cc("\u2000"),
            cc("\u2001"),
            cc("\u2002"),
            cc("\u2003"),
            cc("\u2004"),
            cc("\u2005"),
            cc("\u2006"),
            cc("\u2007"),
            cc("\u2008"),
            cc("\u2009"),
            cc("\u200a"),
            cc("\u2028"),
            cc("\u2029"),
            cc("\u202f"),
            cc("\u205f"),
            cc("\u3000"),
            cc("\ufeff")
        ]

        function BaseRegExpVisitor() {}

        BaseRegExpVisitor.prototype.visitChildren = function(node) {
            for (var key in node) {
                var child = node[key]
                /* istanbul ignore else */
                if (node.hasOwnProperty(key)) {
                    if (child.type !== undefined) {
                        this.visit(child)
                    } else if (Array.isArray(child)) {
                        child.forEach(function(subChild) {
                            this.visit(subChild)
                        }, this)
                    }
                }
            }
        }

        BaseRegExpVisitor.prototype.visit = function(node) {
            switch (node.type) {
                case "Pattern":
                    this.visitPattern(node)
                    break
                case "Flags":
                    this.visitFlags(node)
                    break
                case "Disjunction":
                    this.visitDisjunction(node)
                    break
                case "Alternative":
                    this.visitAlternative(node)
                    break
                case "StartAnchor":
                    this.visitStartAnchor(node)
                    break
                case "EndAnchor":
                    this.visitEndAnchor(node)
                    break
                case "WordBoundary":
                    this.visitWordBoundary(node)
                    break
                case "NonWordBoundary":
                    this.visitNonWordBoundary(node)
                    break
                case "Lookahead":
                    this.visitLookahead(node)
                    break
                case "NegativeLookahead":
                    this.visitNegativeLookahead(node)
                    break
                case "Character":
                    this.visitCharacter(node)
                    break
                case "Set":
                    this.visitSet(node)
                    break
                case "Group":
                    this.visitGroup(node)
                    break
                case "GroupBackReference":
                    this.visitGroupBackReference(node)
                    break
                case "Quantifier":
                    this.visitQuantifier(node)
                    break
            }

            this.visitChildren(node)
        }

        BaseRegExpVisitor.prototype.visitPattern = function(node) {}

        BaseRegExpVisitor.prototype.visitFlags = function(node) {}

        BaseRegExpVisitor.prototype.visitDisjunction = function(node) {}

        BaseRegExpVisitor.prototype.visitAlternative = function(node) {}

        // Assertion
        BaseRegExpVisitor.prototype.visitStartAnchor = function(node) {}

        BaseRegExpVisitor.prototype.visitEndAnchor = function(node) {}

        BaseRegExpVisitor.prototype.visitWordBoundary = function(node) {}

        BaseRegExpVisitor.prototype.visitNonWordBoundary = function(node) {}

        BaseRegExpVisitor.prototype.visitLookahead = function(node) {}

        BaseRegExpVisitor.prototype.visitNegativeLookahead = function(node) {}

        // atoms
        BaseRegExpVisitor.prototype.visitCharacter = function(node) {}

        BaseRegExpVisitor.prototype.visitSet = function(node) {}

        BaseRegExpVisitor.prototype.visitGroup = function(node) {}

        BaseRegExpVisitor.prototype.visitGroupBackReference = function(node) {}

        BaseRegExpVisitor.prototype.visitQuantifier = function(node) {}

        return {
            RegExpParser: RegExpParser,
            BaseRegExpVisitor: BaseRegExpVisitor,
            VERSION: "0.5.0"
        }
    }
)


/***/ })

}]);
//# sourceMappingURL=bundle.113.js.map