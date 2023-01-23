"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[793],{

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
        if (document) {
            vscode_languageserver_textdocument__WEBPACK_IMPORTED_MODULE_0__/* .TextDocument.update */ .n.update(document, deltas, identifier.version);
        }
    }
    doComplete(document, position) {
        return Promise.resolve(undefined);
    }
    doHover(document, position) {
        return Promise.resolve(undefined);
    }
    doResolve(item) {
        return Promise.resolve(undefined);
    }
    doValidation(document) {
        return Promise.resolve([]);
    }
    format(document, range, options) {
        return undefined;
    }
}


/***/ }),

/***/ 6793:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CssService": () => (/* binding */ CssService)
/* harmony export */ });
/* harmony import */ var _base_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1378);
/* harmony import */ var vscode_css_languageservice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8535);


class CssService extends _base_service__WEBPACK_IMPORTED_MODULE_0__/* .BaseService */ .b {
    $service;
    $languageId;
    constructor(mode) {
        super(mode);
        this.$initLanguageService();
        this.$service.configure();
    }
    $initLanguageService() {
        switch (this.mode) {
            case "less":
                this.$languageId = "less";
                this.$service = vscode_css_languageservice__WEBPACK_IMPORTED_MODULE_1__/* .getLESSLanguageService */ .JJ();
                break;
            case "scss":
                this.$languageId = "scss";
                this.$service = vscode_css_languageservice__WEBPACK_IMPORTED_MODULE_1__/* .getSCSSLanguageService */ .zT();
                break;
            case "css":
            default:
                this.$languageId = "css";
                this.$service = vscode_css_languageservice__WEBPACK_IMPORTED_MODULE_1__/* .getCSSLanguageService */ .n7();
                break;
        }
    }
    format(document, range, options) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return [];
        }
        let textEdits = this.$service.format(fullDocument, range, options);
        return textEdits;
    }
    async doHover(document, position) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return null;
        }
        let cssDocument = this.$service.parseStylesheet(fullDocument);
        let hover = this.$service.doHover(fullDocument, position, cssDocument);
        return Promise.resolve(hover);
    }
    async doValidation(document) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return [];
        }
        let cssDocument = this.$service.parseStylesheet(fullDocument);
        let diagnostics = this.$service.doValidation(fullDocument, cssDocument);
        return Promise.resolve(diagnostics);
    }
    async doComplete(document, position) {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return null;
        }
        let cssDocument = this.$service.parseStylesheet(fullDocument);
        let completions = this.$service.doComplete(fullDocument, position, cssDocument);
        return Promise.resolve(completions);
    }
    async doResolve(item) {
        return Promise.resolve(item);
    }
}


/***/ })

}]);
//# sourceMappingURL=bundle.793.js.map