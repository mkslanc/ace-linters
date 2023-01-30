"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[753],{

/***/ 1378:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b": () => (/* binding */ BaseService)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3357);
/* harmony import */ var vscode_languageserver_textdocument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6813);


class BaseService {
    mode;
    documents = {};
    options = {};
    globalOptions = {};
    constructor(mode) {
        this.mode = mode;
    }
    addDocument(document) {
        this.documents[document.uri] = vscode_languageserver_textdocument__WEBPACK_IMPORTED_MODULE_0__/* .TextDocument.create */ .n.create(document.uri, document.languageId, document.version, document.text);
        //TODO:
        /*if (options)
            this.setOptions(sessionID, options);*/
    }
    getDocument(uri) {
        return this.documents[uri];
    }
    removeDocument(document) {
        delete this.documents[document.uri];
        if (this.options[document.uri]) {
            delete this.options[document.uri];
        }
    }
    getDocumentValue(uri) {
        return this.getDocument(uri).getText();
    }
    setValue(identifier, value) {
        let document = this.getDocument(identifier.uri);
        if (document) {
            document = vscode_languageserver_textdocument__WEBPACK_IMPORTED_MODULE_0__/* .TextDocument.create */ .n.create(document.uri, document.languageId, document.version, value);
            this.documents[document.uri] = document;
        }
    }
    setGlobalOptions(options) {
        this.globalOptions = options ?? {};
    }
    setOptions(sessionID, options, merge = false) {
        this.options[sessionID] = merge ? (0,_utils__WEBPACK_IMPORTED_MODULE_1__/* .mergeObjects */ .P)(options, this.options[sessionID]) : options;
    }
    getOption(sessionID, optionName) {
        if (this.options[sessionID] && this.options[sessionID][optionName]) {
            return this.options[sessionID][optionName];
        }
        else {
            return this.globalOptions[optionName];
        }
    }
    applyDeltas(identifier, deltas) {
        let document = this.getDocument(identifier.uri);
        if (document)
            vscode_languageserver_textdocument__WEBPACK_IMPORTED_MODULE_0__/* .TextDocument.update */ .n.update(document, deltas, identifier.version);
    }
    async doComplete(document, position) {
        return null;
    }
    async doHover(document, position) {
        return null;
    }
    async doResolve(item) {
        return null;
    }
    async doValidation(document) {
        return [];
    }
    format(document, range, options) {
        return [];
    }
}


/***/ }),

/***/ 4753:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "XmlService": () => (/* binding */ XmlService)
});

// EXTERNAL MODULE: ./packages/ace-linters/services/base-service.ts
var base_service = __webpack_require__(1378);
// EXTERNAL MODULE: ./node_modules/@xml-tools/parser/lib/api.js
var api = __webpack_require__(266);
// EXTERNAL MODULE: ./node_modules/@xml-tools/ast/lib/api.js
var lib_api = __webpack_require__(8763);
// EXTERNAL MODULE: ./node_modules/@xml-tools/constraints/lib/api.js
var constraints_lib_api = __webpack_require__(9217);
// EXTERNAL MODULE: ./node_modules/@xml-tools/simple-schema/lib/api.js
var simple_schema_lib_api = __webpack_require__(5197);
// EXTERNAL MODULE: ./node_modules/@xml-tools/validation/lib/api.js
var validation_lib_api = __webpack_require__(4434);
// EXTERNAL MODULE: ./node_modules/vscode-languageserver-protocol/lib/browser/main.js
var main = __webpack_require__(152);
;// CONCATENATED MODULE: ./packages/ace-linters/services/xml/xml-converters.ts

function lexingErrorToDiagnostic(document, error) {
    return {
        message: error.message,
        range: main.Range.create(document.positionAt(error.offset), document.positionAt(error.offset + error.length)),
        severity: main.DiagnosticSeverity.Error,
    };
}
function parsingErrorToDiagnostic(document, error) {
    return {
        message: error.message,
        range: {
            start: document.positionAt(error.token.startOffset),
            end: document.positionAt(error.token.endOffset ? error.token.endOffset : 0),
        },
        severity: main.DiagnosticSeverity.Error,
    };
}
function issueToDiagnostic(document, issue) {
    return {
        message: issue.msg,
        range: {
            start: document.positionAt(issue.position.startOffset),
            // Chevrotain Token positions are non-inclusive for endOffsets
            end: document.positionAt(issue.position.endOffset + 1),
        },
        severity: toDiagnosticSeverity(issue.severity),
    };
}
function toDiagnosticSeverity(issueSeverity) {
    switch (issueSeverity) {
        case "error":
            return main.DiagnosticSeverity.Error;
        case "warning":
            return main.DiagnosticSeverity.Warning;
        case "info":
        default:
            return main.DiagnosticSeverity.Information;
    }
}

;// CONCATENATED MODULE: ./packages/ace-linters/services/xml/xml-service.ts







class XmlService extends base_service/* BaseService */.b {
    $service;
    schemas = {};
    constructor(mode) {
        super(mode);
    }
    addDocument(document) {
        super.addDocument(document);
        this.$configureService(document.uri);
    }
    $getXmlSchemaUri(sessionID) {
        return this.getOption(sessionID, "schemaUri");
    }
    $configureService(sessionID) {
        let schemas = this.getOption(sessionID, "schemas");
        schemas?.forEach((el) => {
            if (el.uri === this.$getXmlSchemaUri(sessionID)) {
                el.fileMatch ??= [];
                el.fileMatch.push(sessionID);
            }
            let schema = el.schema ?? this.schemas[el.uri];
            if (schema)
                this.schemas[el.uri] = schema;
            el.schema = undefined;
        });
    }
    $getSchema(sessionId) {
        let schemaId = this.$getXmlSchemaUri(sessionId);
        if (schemaId && this.schemas[schemaId]) {
            return JSON.parse(this.schemas[schemaId]);
        }
    }
    async doValidation(document) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return [];
        const { cst, tokenVector, lexErrors, parseErrors } = (0,api.parse)(fullDocument.getText());
        const xmlDoc = (0,lib_api.buildAst)(cst, tokenVector);
        const constraintsIssues = (0,constraints_lib_api.checkConstraints)(xmlDoc);
        let schema = this.$getSchema(document.uri);
        let schemaIssues = [];
        if (schema) {
            const schemaValidators = (0,simple_schema_lib_api.getSchemaValidators)(schema);
            schemaIssues = (0,validation_lib_api.validate)({
                doc: xmlDoc,
                validators: {
                    attribute: [schemaValidators.attribute],
                    element: [schemaValidators.element],
                },
            });
        }
        return [
            ...lexErrors.map((_) => lexingErrorToDiagnostic(fullDocument, _)),
            ...parseErrors.map((_) => parsingErrorToDiagnostic(fullDocument, _)),
            ...constraintsIssues.map((_) => issueToDiagnostic(fullDocument, _)),
            ...schemaIssues.map((_) => issueToDiagnostic(fullDocument, _))
        ];
    }
}


/***/ })

}]);
//# sourceMappingURL=bundle.753.js.map