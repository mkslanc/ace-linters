"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[934],{

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

/***/ 9934:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HtmlService": () => (/* binding */ HtmlService)
/* harmony export */ });
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1378);
/* harmony import */ var htmlhint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9357);
/* harmony import */ var vscode_html_languageservice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(132);



class HtmlService extends _base_service__WEBPACK_IMPORTED_MODULE_0__/* .BaseService */ .b {
    $service;
    defaultValidationOptions = {
        "attr-no-duplication": true,
        "body-no-duplicates": true,
        "head-body-descendents-html": true,
        "head-no-duplicates": true,
        "head-valid-children": true,
        "html-no-duplicates": true,
        "html-root-node": true,
        "html-valid-children": true,
        "html-valid-children-order": true,
        "img-src-required": true,
        "invalid-attribute-char": true,
        "nested-paragraphs": true,
        "spec-char-escape": true,
        "src-not-empty": true,
        "tag-pair": true
    };
    constructor(mode) {
        super(mode);
        this.$service = vscode_html_languageservice__WEBPACK_IMPORTED_MODULE_2__/* .getLanguageService */ .Oi();
    }
    format(document, range, options) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return [];
        return this.$service.format(fullDocument, range, options);
    }
    async doHover(document, position) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return null;
        let htmlDocument = this.$service.parseHTMLDocument(fullDocument);
        return this.$service.doHover(fullDocument, position, htmlDocument);
    }
    async doValidation(document) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return [];
        }
        let options = this.getOption(document.uri, "validationOptions") ?? this.defaultValidationOptions;
        return htmlhint__WEBPACK_IMPORTED_MODULE_1__/* .HTMLHint.verify */ .WH.verify(fullDocument.getText(), options).map(el => {
            return {
                range: {
                    start: {
                        line: el.line - 1,
                        character: el.col - 1
                    },
                    end: {
                        line: el.line - 1,
                        character: el.col - 1
                    }
                },
                severity: el.type === "error" ? 1 : el.type === "warning" ? 2 : 3,
                message: el.message
            };
        });
    }
    async doComplete(document, position) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return null;
        let htmlDocument = this.$service.parseHTMLDocument(fullDocument);
        return this.$service.doComplete(fullDocument, position, htmlDocument);
    }
    async doResolve(item) {
        return item;
    }
}


/***/ })

}]);
//# sourceMappingURL=bundle.934.js.map